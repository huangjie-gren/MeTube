<template>
    <div>
        <el-button
            :loading="loading"
            type="primary"
            style="width:30%;margin-top:30px;margin-left:30px"
            @click.native.prevent="onClick"
          >获取排行榜</el-button>
        <el-table
            :data="vData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'visited', order: 'descending'}"
            >
            <el-table-column
                label="排名"
                width="180px">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="info"
                label="简介"
                width="250">
            </el-table-column>
            <el-table-column
                prop="visited"
                label="访问量"
                sortable
                width="180">
            </el-table-column>
            <el-table-column                
                label="点击播放"
                show-overflow-tooltip>
                <template slot-scope="scope" >
                    <el-button
                        size="mini"
                        @click="handlePlay(scope.row.id)"
                        circle="true"
                        icon="el-icon-caret-right">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="total, sizes, prev, pager, next"
            @current-change="current_change"
            @size-change="size_change"
            :page-sizes="[10, 20, 30, 40]"
            :total="total"
            background
            style="text-align:center">
        </el-pagination>
    </div>
</template>

<script>
import { getVedioInfo } from '@/api/rankinglist'
export default {
    data() {
        return {
            vData: [{
                title: '123',
                info: '456',
                visited: '789',
                id: '233'
            }, {
                title: '999',
                info: '456',
                visited: '999',
                id: '233'
            }],
            total: '', //数据总数
            pagesize:10, //默认每页的数据条数
            currentPage:1, //默认开始页面
        }
    },
    methods: {
        formatter(row, column) {
            return row.avatar;
        },
        onClick() {
            getVedioInfo()    // 一次性获得所有信息，由前端分页，后端还未实现
                .then(response => {
                    // console.log('haha')
                    const { data } = response
                    this.vData = data
                    this.total = this.vData.length;
                })
                .catch(error => {
                    alert(error)
                })
        },
        handlePlay(id) {
            /* 如何路由到具体的播放页 */
            //
        },
        current_change:function(currentPage) {
            this.currentPage = currentPage;
        },
        size_change:function(pagesize) {
            this.pagesize = pagesize;
        }
    },
    created:function(){
        this.total = this.vData.length;
    }
}
</script>

<style scoped>
</style>
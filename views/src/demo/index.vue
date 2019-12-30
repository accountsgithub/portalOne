/**
* @author
* @date 2019/12/23
*/
<template>
  <div class="main-div-style">
    <div>
      <el-input v-model="search1.key"></el-input>
      <el-button @click="createMethod('0')">一般查询</el-button>
      <div>{{search1.time}}</div>
      <div>{{search1.value}}</div>
    </div>
    <div>
      <el-input v-model="search2.key"></el-input>
      <el-button @click="searchMethod('1')">快速查询</el-button>
      <span>{{search2.time}}</span>
      <span>{{search2.value}}</span>
    </div>
  </div>
</template>

<script>
import datas from './datas.json'
export default {
  name: 'index',
  data () {
    return {
      search1: {
        key: '',
        time: 0,
        value: []
      },
      search2: {
        key: '',
        time: 0,
        value: []
      },
      indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB,
      db: null,
      DB_NAME: 'mdn-demo-indexeddb-epublication',
      DB_VERSION: 7, // Use a long long for this value (don't use a float)
      DB_STORE_NAME: 'publications6'
    }
  },
  methods: {
    searchMethod () {
      console.log('searchdb111111111111', this.db)
      var transaction = this.db.transaction(this.DB_STORE_NAME, 'readwrite')
      var objectStore = transaction.objectStore(this.DB_STORE_NAME)
      var request = objectStore.get(1)
      var request1 = objectStore.get('name')
      request.onsuccess = function (event) {
        // 对 request.result 做些操作！
        console.log(request.result)
      }
      request1.onsuccess = function (event) {
        // 对 request.result 做些操作！
        console.log(request1.result)
      }
    },
    createMethod () {
      console.log('openDb ...')
      var req = indexedDB.open(this.DB_NAME, this.DB_VERSION)
      req.onsuccess = (evt) => {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        this.db = req.result
        console.log('db', this.db)
        console.log('openDb DONE')
        var tran = this.db.transaction(this.DB_STORE_NAME, 'readwrite')
        console.log(tran) // IDBObjectStore
        // 再创建数据库表，通过事务控制对象获取数据表对象
        var objectStore = tran.objectStore(this.DB_STORE_NAME)
        console.log(objectStore)
        var adduser = null
        for (let i = 10; i < 20; i++) {
          adduser = objectStore.add({
            id: i,
            name: 'name' + i
          })
        }
        console.log('add', adduser)
      }
      req.onerror = function (evt) {
        console.error('openDb:', evt.target.errorCode)
      }
      req.onupgradeneeded = (evt) => {
        console.log('openDb.onupgradeneeded')
        console.log('onupgradeneeded-db', req.result)
        this.db = req.result
        let store = this.db.createObjectStore(this.DB_STORE_NAME, { keyPath: 'id', autoIncrement: true })
        store.createIndex('name', 'name', {unique: false})
        /* store.createIndex('biblioid', 'biblioid', { unique: true })
        store.createIndex('title', 'title', { unique: false })
        store.createIndex('year', 'year', { unique: false })
        this.db = store */
      }
    },
    quicklySearch () {
      this.search2.value = []
      let time1 = this.consoleTime()
      let objectData = this.normalize('id', datas)
      console.log(objectData)
      let time2 = this.consoleTime()
      this.search2.time = time2 - time1
    },
    slowlySearch () {
      this.search1.value = []
      let time1 = this.consoleTime()
      datas.map(item => {
        if (item.code.indexOf(this.search1.key) > -1) {
          this.search1.value.push(item.code)
        }
      })
      let time2 = this.consoleTime()
      this.search1.time = time2 - time1
    },
    consoleTime () {
      let data = new Date()
      return Number(data)
    },
    normalize (identify, data) {
      const id2Value = {}
      data.forEach(item => {
        const idValue = item[identify]
        id2Value[idValue] = item
      })
      return id2Value
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-div-style {
    background: #fff;
    height: 100%;
    width: 100%;
  }
</style>

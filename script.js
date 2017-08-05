//хранение данных блокнота в локальном хранилище
//код взят с https://ru.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'notepad-vue'//название хранилища
var notepadStorage = {
  fetch: function () {//получение данных изхранилища
    var records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    records.forEach(function (record, index) {
      record.id = index
    })
    notepadStorage.uid = records.length//todo узнать что должна делать эта строка
    return records
  },
  save: function (records) {//сохранение данных в хранилище
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }
}

var app = new Vue({
  el: '#app',
  data: {
    title: 'Hello Vue!',
	message: '',
	records: notepadStorage.fetch(),
    newRecord: '',
  },

  watch: {
    records: {
      handler: function (records) {
        notepadStorage.save(records)
      },
      deep: true
    }
  },

  methods:{
	addRecord: function (){
	  var value = this.newRecord && this.newRecord.trim()
      if (!value) {
        return
      }
      this.records.push({
        id: notepadStorage.uid++,
        title: value,
        message: value,
        completed: false
      })
      this.newRecord = ''
    }
  }
})




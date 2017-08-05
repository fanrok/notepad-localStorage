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
    RecordTitle: '',
    RecordMessage: '',
    RecordId: '',
	editedRecord: null,
  },

  watch: {//наблюдатель. При любом изменении в записях сохраняет их.
    records: {
      handler: function (records) {
        notepadStorage.save(records)
      },
      deep: true
    }
  },

  methods:{
	addRecord: function (){//Сохранение записи
	  var title = this.RecordTitle && this.RecordTitle.trim()
	  var message = this.RecordMessage && this.RecordMessage.trim()
	  var id = this.RecordId && this.RecordId.trim()
      if (!title) {
        return
      }
      this.records.push({
        id: notepadStorage.uid++,
        title: title,
        message: message,
        completed: false
      })
      this.RecordTitle = ''
      this.RecordMessage = ''
      this.RecordId = ''
    },
	editRecord: function(record){
	  this.RecordTitle = record.title
      this.RecordMessage = record.message
      this.RecordId = record.id
	  return
	},
	deleteRecord: function(){
	  return
	},
  }
})




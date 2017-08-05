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
    title: 'Простой блокнот с использованием vue.js,localStorage и bootstrap',
	message: '',
	records: notepadStorage.fetch(),
    RecordTitle: '',
    RecordMessage: '',
	editedRecord: false	,
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
	addRecord: function (){//Добавим новую запись
	  id = this.records.push({
		id: notepadStorage.uid++,
		title: '',
		message: '',
	  })
	  this.editedRecord = this.records[id-1]
      this.RecordTitle = ''
      this.RecordMessage = ''
    },
	editRecord: function(record){
	  this.editedRecord = record
	  this.RecordTitle = record.title
      this.RecordMessage = record.message
	  return
	},
	saveRecord: function(record){
	  var title = this.RecordTitle && this.RecordTitle.trim()
	  var message = this.RecordMessage && this.RecordMessage.trim()
      if (record){		  
		  record.title = title
		  record.message = message
	  }else{
		id = this.records.push({
		id: notepadStorage.uid++,
		title: title,
		message: message,
	    })
        this.editedRecord = this.records[id-1]
	  }
	  return
	},
	deleteRecord: function(record){
	  this.records.splice(this.records.indexOf(record), 1)
      this.RecordTitle = ''
      this.RecordMessage = ''
      this.editedRecord = false;
	  return
	},
  }
})




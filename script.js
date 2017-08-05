//хранение данных блокнота в локальном хранилище
//код взят с https://ru.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'notepad-vue'//название хранилища
var notepadStorage = {
  fetch: function () {//получение данных изхранилища
    var records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    records.forEach(function (record, index) {
      record.id = index
    })
    notepadStorage.uid = records.length
    return records
  },
  count: function(){
	var records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
	if (records.length > 0){
		return true
	}else{
		return false
	}
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
	showDelete: false,
    showAdd: notepadStorage.count(),
  },

  watch: {//наблюдатель. При любом изменении в записях сохраняет их.
    records: {
      handler: function (records) {
        notepadStorage.save(records)
        if (records.length > 0){
			this.showAdd = true
		}else{
			this.showAdd = false
		}
      },
      deep: true
    }
  },

  methods:{
	addRecord: function (){//Добавим новую запись
	  id = this.records.push({//что бы при создании не создавать каждый раз новую запись получим id
		id: notepadStorage.uid++,
		title: '',
		message: '',
	  })
	  if (id>0){
	    this.editedRecord = this.records[id-1]//укажем указатель на свежую запись
		this.showDelete = true
	  }
      this.RecordTitle = ''
      this.RecordMessage = ''
	  
    },
	editRecord: function(record){//редактирование записи
	  this.editedRecord = record
	  this.RecordTitle = record.title
      this.RecordMessage = record.message
	  this.showDelete = true
	  return
	},
	/*
		Сохранение записи.
	*/
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
        if (id>0){
	      this.editedRecord = this.records[id-1]//укажем указатель на свежую запись
          this.showDelete = true
	    }
	  }
	  return
	},
	deleteRecord: function(record){
	  this.records.splice(this.records.indexOf(record), 1)
      this.RecordTitle = ''
      this.RecordMessage = ''
      this.editedRecord = false;
      this.showDelete = false
	  return
	},
  }
})




/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var confDB = {
   //Variable de comprobacion existencia bd
    existe_db:"",
    db:"",

    //CONSTRUCTOR
    initialize: function(){
        //Declaracion de la variable existe_db
        this.existe_db= window.localStorage.getItem("existe_db");

        //Enlazamos con la base de datos
        this.db= window.openDatabase("localDB", "1.0","Base de datos SQL",2*1024*1024);

        
        if(this.existe_db == null || this.existe_db == false){
            //Log de ruptura
            console.log("LA BBDD NO EXISTE");
            this.createDB();
        }else{
            console.log("LA BBDD YA EXISTE");
        }
    },


    createDB: function(){
        console.log("CREAMOS LA BBDD");
        //Metodo transaction
        this.db.transaction(this.createLocalDB, this.createDBError, this.createDBSuccess);
    },

    createLocalDB: function(tx){
        var sql = "CREATE TABLE IF NOT EXISTS localDB ("+
                  "id           INTEGER         primary key autoincrement,"+
                  "nombre       VARCHAR(50)     not null,"+
                  "posicion     VARCHAR(250)    not null,"+
                  "dorsal       INTEGER         not null,"+
                  "email        VARCHAR(250)    not null );"
            ;
            tx.executeSql(sql);
            console.log("TABLA CREADA CORRECTAMENTE");

            //Inserción de datos en la tabla creada anteriormente
            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(1, 'Joaquin Bahamonde', 'Delantero', 17, 'joballo.17@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(2, 'Ivan Estruch', 'Extremo', 18, 'estruch95.b@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(3, 'Jose Igualada', 'MedioCentro', 8, 'igualada@hotmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(4, 'Alvaro Banyo', 'Portero', 1, 'albafo@hotmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(5, 'Fran Primo', 'Defensa', 8, 'franpri@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(6, 'David Alos', 'Defensa', 22, 'alos@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO localDB(id, nombre, posicion, dorsal, email)"+
                  "VALUES(7, 'Nico Pons', 'Defensa', 44, 'nicopons24@gmail.com')";
            tx.executeSql(sql);
            console.log("INSERCION DE DATOS REALIZADA CORRECTAMENTE");
    },

    createDBError: function(err){
        console.log("ERROR DE CREACION DE BBDD"+error.code);
    },

    createDBSuccess: function(){
        console.log("BBDD GENERADA CORRECTAMENTE");
        window.localStorage.setItem("existe_db",1);
    }

};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;'); */

        console.log('Received Event: ' + id);

        //SE INICIA LA COMPROBACION DE EXISTENCIA DE db
        confDB.initialize();
    }
};

app.initialize();
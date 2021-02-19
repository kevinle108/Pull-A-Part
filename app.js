console.log('hello world')
        const carList = []
        document.getElementById("addButton").addEventListener('click', () => {
            const listEle = document.getElementById("carList")
            const listItem = document.createElement('li')
            //listItem.innerText = document.getElementById("carInput").value
            const carSearch = document.getElementById("carInput").value.toUpperCase().trim()
            carList.push(carSearch)
            listItem.innerText = carSearch
            listEle.appendChild(listItem)
            document.getElementById("carInput").value = ''
        })

        


        // API Requests //
        const method = 'Get',
        url = 'https://enterpriseservice.pullapart.com/Location'
        const data = {
            location: null,
            make: null,
            model: null,
            search: null
        }
        let makeID = null

        // xhrLocation = new XMLHttpRequest();
        // xhrLocation.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         const locationData = JSON.parse(xhrLocation.responseText)
        //         console.log('found Location data')
        //         console.dir(locationData)
        //         data.location = locationData               
        //     }
        // }
        // xhrLocation.open('Get', 'https://enterpriseservice.pullapart.com/Location')
        // xhrLocation.send()

        getLocationDataWithPromise().then(locationData => {
            data.location = locationData
            console.log('Found LOCATION DATA:')
            console.dir(data.location)
        })

        getMakeDataWithPromise().then(makeData => {
            data.make = makeData
            console.log('Found MAKE DATA:')
            console.dir(data.make)
            
            
            // Find the makeID for TOYOTA
            for (let e of data.make) {
                if (e.makeName == 'TOYOTA') {
                    console.log(`Toyota's makeID is ${e.makeID}`)
                    makeID = e.makeID
                    break
                }
            }

            getModelDataWithPromise(makeID).then(modelData => {
                data.model = modelData
                console.log('Found MODEL DATA:')
                console.dir(data.model)
            })
        })

        const BODY_PARAMETERS = {"Locations":["8"],"Models":["861"],"MakeID":56,"Years":[]}

        searchCar(BODY_PARAMETERS, makeID).then(searchResponse => {
            console.log('DONE WITH CAR SEARCH!')
            console.dir(searchResponse)
        })
        

        /////////////// FUNCTIONS ///////////////////////////////////////

        function getLocationDataWithPromise() {
            var xhrLocation = new XMLHttpRequest();
            return new Promise(function(resolve, reject) {
                xhrLocation.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhrLocation.responseText));
                    }
                }
                    
                xhrLocation.open('get', 'https://enterpriseservice.pullapart.com/Location', true)
                xhrLocation.send();
            });
        }

        
        function getMakeDataWithPromise() {
            var xhrMake = new XMLHttpRequest();
            return new Promise(function(resolve, reject) {
                xhrMake.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhrMake.responseText));
                    }
                }
                    
                xhrMake.open('get', 'https://inventoryservice.pullapart.com/Make', true)
                xhrMake.send();
            });
        }

        function getModelDataWithPromise(makeID) {
            var xhrModel = new XMLHttpRequest();
            return new Promise(function(resolve, reject) {
                xhrModel.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhrModel.responseText));
                    }
                }
                    
                xhrModel.open('get', 'https://inventoryservice.pullapart.com/Model?makeID='+makeID, true)
                xhrModel.send();
            });
        }

        function searchCar(bodyParameters, makeID) {
            var xhr = new XMLHttpRequest();
            return new Promise(function(resolve, reject) {
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
                xhr.open('POST', 'https://inventoryservice.pullapart.com/Vehicle/Search', true)
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify({"Locations":["8"],"Models":["861"],"MakeID":56,"Years":[]}));   
                
                // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                // xmlhttp.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));                
            });
        }

        // xhrMake = new XMLHttpRequest();
        // xhrMake.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         const makeData = JSON.parse(xhrMake.responseText)
        //         console.log('found Make data')
        //         console.dir(makeData)
        //         data.make = makeData

        //         for (let e of data.make) {
        //             if (e.makeName == 'TOYOTA') {
        //                 console.log(`Toyota's makeID is ${e.makeID}`)
        //                 makeID = e.makeID
        //                 break
        //             }
        //         }
        //         getModelData()
        //     }
        // }
        // xhrMake.open('Get', 'https://inventoryservice.pullapart.com/Make/')
        // xhrMake.send()

        



        

        // function getModelData(makeID) {
        //     console.log('getModelData fired')
        //     xhrModel = new XMLHttpRequest()
        //     console.log('made request')
        //     xhrModel.onreadystatechange = function() {
        //         if (this.readyState == 4 && this.status == 200) {
        //         const modelData = JSON.parse(xhrModel.responseText)
        //         console.log('found Model data')
        //         console.dir(modelData)
        //         data.model = modelData
        //         }
        //     }
        //     console.log(`Inside model, the makeID is ${makeID}`)
        //     xhrModel.open('Get', 'https://inventoryservice.pullapart.com/Model?makeID='+makeID)
        //     xhrModel.send()
        // }
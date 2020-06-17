# Test Task
### Project Setup
```
git clone https://github.com/varvar/rubiq.git
cd to folder rubiq
npm install
npm update
```

### Run
```
npm start
```
Once server started it will be accessible on http://localhost:8080/

### API Reference

#### Upload CSV Files ####

* #### URL ####

  http://localhost:8080/upload

* #### Method: #### 
  
  `POST`

* #### Headers #### 
  
  `Content-Type: multipart/form-data`  
  
* #### Data Params #### 

  ```
    {
    	"pnr":"PNR1-task.csv",
    	"flights": "flights1.csv"
	}

  ```
    Please note, that file names are hardcoded and code will look for that files in allocation process

* #### Success Response: #### 
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    {
	    "status": true,
	    "message": "Files are uploaded",
	    "data": [
	        {
	            "name": "PNR1-task.csv",
	            "mimetype": "text/csv",
	            "size": 109
	        },
	        {
	            "name": "flights1.csv",
	            "mimetype": "text/csv",
	            "size": 44
	        }
	    ]
	}
    ```

#### Get flights allocation ####

* #### URL ####

  http://localhost:8080/process

* #### Method: #### 
  
  `GET`

* #### Success Response: #### 
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    [
	    {
	        "id": "F1",
	        "origin": "A",
	        "dest": "B",
	        "capacity": 0,
	        "pnrs": [
	            "PNR04"
	        ]
	    },
	    {
	        "id": "F5",
	        "origin": "C",
	        "dest": "B",
	        "capacity": 1,
	        "pnrs": [
	            "PNR10",
	            "PNR07"
	        ]
	    },
	    {
	        "id": "F6",
	        "origin": "A",
	        "dest": "C",
	        "capacity": 0,
	        "pnrs": [
	            "PNR02",
	            "PNR09"
	        ]
	    },
	    {
	        "id": "F4",
	        "origin": "A",
	        "dest": "C",
	        "capacity": 0,
	        "pnrs": [
	            "PNR08",
	            "PNR05",
	            "PNR07"
	        ]
	    },
	    {
	        "id": "F2",
	        "origin": "A",
	        "dest": "B",
	        "capacity": 0,
	        "pnrs": [
	            "PNR01",
	            "PNR06"
	        ]
	    }
	]
    ```    
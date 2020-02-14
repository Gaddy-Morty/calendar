# RESTful API for CRUD operation on the calendar

## Create
### HTTP POST request to:
```html
/v2/house/:id/:check_in_date/:check_out_date/:adults/:childs/:infants  
```
Will create a new entry with in the database for a reservation with all the relevant details 
as in the request parameters:  
**id:** 
A string with the id of the house in the database (number)  
**check_in_date:**
A string with the check-in date in this format: 'mm-dd-yyyy'  
**check_out_date:**
A string with the check-out date in this format: 'mm-dd-yyyy'  
**adults:**
A string with the amount on the adults for this reservation (number)  
**childs:**
A string with the amount on the children for this reservation (number)  
**infants:**
A string with the amount on the infants for this reservation (number)  


## Read
### HTTP GET request to:
```html
/v2/house/:id
```
Will get the availble prices, reserved (or blacked out date by the host) dates, max adults amount (for adults, children & infants)  

## Update
### HTTP Update request to:
/v2/house/:id/:check_in_date/:check_out_date/:adults/:childs/:infants  
Will update the a house entry with reservation including the reserved dates and people amount (for adults, children & infants)


## Delete
### HTTP Delete request to:
/v2/house/:id/:check_in_date/:check_out_date/:adults/:childs/:infants  
Will delete a reservation entry

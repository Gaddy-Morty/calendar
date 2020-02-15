# RESTful API for booking a reservation and for house listing
# --- HOUSE LISTING ---
## Create a house listing:
```
POST /v2/houses/  
```
Will create a new house entry in the database.
#### Parameters
* None
#### Request body
```json
{
  "price_per_night": "number",
  "max_adults": "number",
  "max_children": "number",
  "max_infants": "number",
  "cleaning_fee": "number",
  "service_fee": "number",
  "occupancy_taxes_fees": "number",
  "min_allowed_nights": "number"
}
```
#### Response  
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the house entry was created succesfully.
  * 406 in case that the user (host) asked for a acceptable reqeust.
---

## Read a house listing:
```
GET /v2/houses/:id
```
Will read and retrieve a specific house listing from the database.
#### Parameters
* **id:** 
A number with the id of the house in the database.
#### Request body
* None
#### Response  
```json
{
  "id": "number",
  "price_per_night": "number",
  "max_adults": "number",
  "max_children": "number",
  "max_infants": "number",
  "cleaning_fee": "number",
  "service_fee": "number",
  "occupancy_taxes_fees": "number",
  "min_allowed_nights": "number"
}
```
---

## Update a house listing:
```
PATCH /v2/houses/:id
```
Will update an existed house entry in the database - you do not have to specify all of them, only the properties you want to change.
#### Parameters
* **id:** 
A number with the id of the house in the database
#### Request body
You can either change one of the properties or all of them.
```json
{
  "price_per_night": "number",
  "max_adults": "number",
  "max_children": "number",
  "max_infants": "number",
  "cleaning_fee": "number",
  "service_fee": "number",
  "occupancy_taxes_fees": "number",
  "min_allowed_nights": "number"
}
```
#### Response  
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the house entry was changed succesfully.
  * 406 in case that the user (host) asked for a not acceptable reqeust.
---

## Delete a house listing:
```
POST /v2/houses/:id
```
Will delete an existing house entry in the database.
#### Parameters
* **id:** 
A number with the id of the house in the database
#### Request body
* None
#### Response  
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the house entry was deleted succesfully.
  * 406 in case that the user (host) asked for not acceptable reqeust.
---



# --- RESERVATIONS ---
## Book a reservation:
```
POST /v2/houses/:id/reservations/:check_in_date/:check_out_date/:adults/:children/:infants  
```
Will create a new entry with in the database for a reservation.
#### Parameters
* **id:** 
A number with the id of the house in the database  
* **check_in_date:**
A string with the check-in date in this format: 'mm-dd-yyyy'  
* **check_out_date:**
A string with the check-out date in this format: 'mm-dd-yyyy'  
* **adults:**
A number with the amount on the adults for this reservation  
* **children:**
A number with the amount on the children for this reservation  
* **infants:**
A number with the amount on the infants for this reservation  
#### Request body
* None
#### Response  
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the reservation was created succesfully.
  * 406 in case that the user asked for not acceptable reqeust.
---

## Read all reservations for a specific house
```
GET /v2/houses/:id/reservations
```
Will get the reserved (or blacked out date by the host) dates for a specific house.
#### Parameters
#### Request body
#### Response
* The response will come as an array of reservation objects
```
{[
  {
    "id": 1,
    "total_price": "number",
    "adults_amout": "number",
    "children_amout": "number",
    "infants_amout": "number",
    "check_in_date": "Date",
    "check_out_date": "Date"
  },
  {
    "id": 2,
    "total_price": "number",
    "adults_amout": "number",
    "children_amout": "number",
    "infants_amout": "number",
    "check_in_date": "Date",
    "check_out_date": "Date"
  },
  ...,
  {
    "id": 99,
    "total_price": "number",
    "adults_amout": "number",
    "children_amout": "number",
    "infants_amout": "number",
    "check_in_date": "Date",
    "check_out_date": "Date"
  }
]}
```
---

## Update a specific reservation for a specific house
```
PATCH /v2/houses/:id/reservations/:reservationId/:check_in_date/:check_out_date/:adults/:children/:infants
```
Will update a specific house entry with a reservation including the reserved dates and people amount (for adults, children & infants) - you do not have to specify all of them, only the properties you want to change.
#### Parameters
* **id:** 
A number with the id of the house in the database
* **reservationId**
A number with the id of the reservation
* **check_in_date:**
A string with the check-in date in this format: 'mm-dd-yyyy'  
* **check_out_date:**
A string with the check-out date in this format: 'mm-dd-yyyy'  
* **adults:**
A number with the amount on the adults for this reservation  
* **children:**
A number with the amount on the children for this reservation  
* **infants:**
A number with the amount on the infants for this reservation  
#### Request body
* None
#### Response  
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the reservation entry was changed succesfully.
  * 406 in case that the user asked for a not acceptable reqeust.
---

## Delete a specific reservation from a specific house
```
DELETE /v2/houses/:id/reservations/:reservationId
```
Will delete a specific reservation from a specific house
#### Parameters
* **id:** 
A number with the id of the house in the database
* **reservationId**
A number with the id of the reservation
#### Request body
* None
#### Response
* HTTP code according to if the request was succeeded or not:
  * 201 in case that the reservation entry was deleted succesfully.
  * 406 in case that the user asked for not acceptable reqeust.
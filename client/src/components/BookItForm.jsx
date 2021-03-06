import React from 'react'
import ReactDOM from 'react-dom';
import moment from 'moment'

import Calendar from './Calendar.jsx'
import GuestList from './GuestList.jsx'
import BookingSummaryList from './BookingSummaryList.jsx'

import BookItFormWrapper from '../styles/BookItForm/BookItFormWrapper.js'
import DateField from '../styles/BookItForm/DateField.js'
import DateArrow from '../styles/BookItForm/DateArrow.js'
import FieldLabel from '../styles/BookItForm/FieldLabel'
import BookItButton from '../styles/BookItForm/BookItButton.js'
import ButtonSubtext from '../styles/BookItForm/ButtonSubtext.js'
import CheckoutButtonWrapper from '../styles/BookItForm/CheckoutButtonWrapper.js'
import { flattenCalendar } from '../../../calendar/helpers.js';



class BookItForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarClicked: false,
            guestListClicked: false,
            currentCalendarClicked: null,
            currentMonth: moment().month()
        }
        this.renderCalendar = this.renderCalendar.bind(this)
        this.renderGuestList = this.renderGuestList.bind(this)
        this.handleGuestListClick = this.handleGuestListClick.bind(this)
        this.handleMonthChangeClick = this.handleMonthChangeClick.bind(this)
        this.isUserInfoComplete = this.isUserInfoComplete.bind(this)
        this.renderBookingSummary = this.renderBookingSummary.bind(this)
    }

    renderCalendar() {
        console.log(this.state.currentCalendarClicked)
        if (this.state.calendarClicked) {
            return <Calendar currentMonth = {this.props.flatCalendar[this.state.currentMonth]} 
            handleMonthChangeClick = {this.handleMonthChangeClick} changeDaysBooked = {this.props.changeDaysBooked} currentCalendarClicked = {this.state.currentCalendarClicked}/>
        }
        return <div></div>
    }
    
    renderGuestList() {
        if (this.state.guestListClicked) {
            return <GuestList guestsBooked = {Object.create(this.props.userInfo.guestsBooked)} guestsAllowed = {this.props.guestsAllowed} changeGuests = {this.props.changeGuests}/>
        }
        return <div></div>
    }

    renderBookingSummary() {
        if (this.isUserInfoComplete()) {
            return (<BookingSummaryList pricePerNight = {this.props.pricePerNight} daysRenting = {this.props.daysRenting}/>)
        }
        return null
    }

    handleGuestListClick(event) {
        event.preventDefault()
        this.setState({
            guestListClicked: !this.state.guestListClicked
        });
    }

    handleMonthChangeClick(isAdding, event) {
        event.preventDefault()
        if (isAdding) {
            if (this.props.flatCalendar[this.state.currentMonth + 1]) {
                this.setState((state, props) => {
                    state.currentMonth += 1
                    return state
                })
            } 
        
        } else {
            if (this.props.flatCalendar[this.state.currentMonth - 1]) {
                this.setState((state, props) => {
                    state.currentMonth -= 1
                    return state

                })
            }
        }
    }

    isUserInfoComplete() {
        if (this.props.userInfo.daysBooked.end !== '' && this.props.userInfo.daysBooked.start !== '') {
            return true
        }
        return false
    }



    render() {
        return (
        <BookItFormWrapper>
            <FieldLabel>Dates</FieldLabel>
            <DateField name = 'start' value = {this.props.userInfo.daysBooked.start} placeholder = "Check-in" readOnly onClick = {(event) => {
                this.setState({
                calendarClicked: !this.state.calendarClicked,
                currentCalendarClicked: event.target.name
            })}}/>
            <DateArrow />
            <DateField name = 'end' value = {this.props.userInfo.daysBooked.end} placeholder = "Checkout" readOnly onClick = {(event) => {this.setState({
                calendarClicked: !this.state.calendarClicked,
                currentCalendarClicked: event.target.name
            })}}/>
            {this.renderCalendar()}
            <FieldLabel>Guests</FieldLabel>
            <BookItButton onClick = {this.handleGuestListClick}>
                <div style = {{float: 'left'}}>{this.props.userInfo.guestsBooked.adult + this.props.userInfo.guestsBooked.child} Guests,</div>
                <div style = {{float: 'left'}}>{this.props.userInfo.guestsBooked.infant} Infant</div>
                <div style = {{float: 'right'}}>^</div>
            </BookItButton>
            {this.renderGuestList()}
            {this.renderBookingSummary()}
            <CheckoutButtonWrapper>
              <BookItButton primary><div style = {{color: 'white'}}>Reserve</div></BookItButton>
              <ButtonSubtext>You Won't be Charged Yet</ButtonSubtext>
            </CheckoutButtonWrapper>
        </BookItFormWrapper>
        )
    }
}

export default BookItForm
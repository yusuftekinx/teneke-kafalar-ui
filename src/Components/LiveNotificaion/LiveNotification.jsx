import React, { useRef, useState } from 'react'
import IO, { connect } from 'socket.io-client'
import InputWıthIcon from '../Auth/InputWithIcon/InputWithIcon'
import { toast } from 'react-toastify'
import './LiveNotification.css'
import { RiHeading, BsChatTextFill } from 'react-icons/all'
import ReactNotifications from 'react-browser-notifications';
import TKIcon from '../../img/tk-logo.png'
import { API_HOST } from '../../Service/settings';

const io = IO(`${API_HOST}/notification`)


class LiveNotification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationHeader: '',
            notificationBody: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        window.focus()
        this.n.close(event.target.tag);
    }

    sendNotification = (e) => {
        e.preventDefault();
        io.emit('sendNotification', {
            head: this.notificationHeader,
            body: this.notificationBody
        })
        toast.success('Bildirim gönderildi')
        if (this.n.supported()) this.n.show();

        this.setState({
            notificationHeader: '',
            notificationBody: ''
        })

    }

    sendWebNotifications = (e) => {
        this.n.close(e.target.tag);
    }

    onSetNotificationHeader = (e) => {
        this.setState({
            notificationHeader:e
        })
    }

    onSetNotificationBody = (e) => {
        this.setState({
            notificationBody: e
        })
    }

    render() {
        return (
            <div className="notification-component">
                {
                    this.props.role !== 'admin' ? 'Bildirimleri almak için ayarları açın' : <div>
                        <div className="top">
                    <h2 className="zenKakuText mt20">Canlı Bildirim</h2>
                </div>
                <ReactNotifications
                    onRef={ref => (this.n = ref)} // Required
                    title={this.state.notificationHeader} // Required
                    body={this.state.notificationBody}
                    icon={TKIcon}
                    tag="abcdef"
                    timeout="0"
                    onClick={event => this.handleClick(event)}
                />
                <div className="center">
                    <form onSubmit={this.sendNotification}>
                        <InputWıthIcon value={this.state.notificationHeader} icon={<RiHeading />} onChangeEvent={this.onSetNotificationHeader} placeholder="Bildirim Başlığı" />
                        <InputWıthIcon value={this.state.notificationBody} icon={<BsChatTextFill />} onChangeEvent={this.onSetNotificationBody} placeholder="Bildirim İçeriği" />
                        <button className="tkButton mt20">Gönder</button>
                    </form>
                </div>
                    </div>
                }
            </div>
        )
    }
}

export default LiveNotification

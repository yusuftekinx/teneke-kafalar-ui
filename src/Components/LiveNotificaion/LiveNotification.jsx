import React, { useRef, useState } from 'react'
import IO, { connect } from 'socket.io-client'
import InputWıthIcon from '../Auth/InputWithIcon/InputWithIcon'
import { toast } from 'react-toastify'
import './LiveNotification.css'
import { RiHeading, BsChatTextFill } from 'react-icons/all'
import ReactNotifications from 'react-browser-notifications';
import TKIcon from '../../img/tk-logo.png'
import ReactDOM from 'react-dom'


class LiveNotification extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notificationHeader: '',
            notificationBody: '',
            liveNotificationHeader: '',
            liveNotificationBody: ''
        }

        //this.handleClick = this.handleClick.bind(this);

        // this.io = this.props.io
        // this.io.on('liveNotification', (data) => {
        //     console.log(data)
        //     this.setState({
        //         liveNotificationHeader: data.head,
        //         liveNotificationBody: data.body
        //     })

        // })



    }

    // componentDidMount() {
    //     ReactDOM.render(<div>
    //         <ReactNotifications
    //             onRef={ref => (this.n = ref)} // Required
    //             title={this.state.liveNotificationHeader} // Required
    //             body={this.state.liveNotificationBody}
    //             icon={TKIcon}
    //             tag="abcdef"
    //             timeout="4000"
    //             onClick={event => this.handleClick(event)}
    //         />
    //     </div>, document.getElementById('n-Area'))

    //     if (this.n?.supported()) {
    //         this.n.show();
    //     }
    // }



    // handleClick(event) {
    //     window.focus()
    //     this.n.close(event.target.tag);
    // }



    // sendNotification = (e) => {
    //     e.preventDefault();
    //     this.io.emit('sendNotification', {
    //         head: this.state.notificationHeader,
    //         body: this.state.notificationBody
    //     })
    //     toast.success('Bildirim gönderildi')


    //     this.setState({
    //         notificationHeader: '',
    //         notificationBody: ''
    //     })

    // }

    // sendWebNotifications = (e) => {
    //     this.n.close(e.target.tag);
    // }
    onSetNotificationHeader = (e) => {
        this.setState({
            notificationHeader: e
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
                        <div id="n-Area"></div>
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

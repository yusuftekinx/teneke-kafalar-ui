import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import './Vote.css'
import io from 'socket.io-client'
import { BASE_URL } from '../../Service/settings'
import { FaPlus, IoMdClose, MdHowToVote, RiNumber1, FaUserAlt, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/all';
import InputWithIcon from '../Auth/InputWithIcon/InputWithIcon';
import SpinnerSVG from '../../img/spinner.svg'
import Modal from 'react-modal';
import { createVoteRequest } from '../../Service/Vote/createVoteRequest';
import { toast } from 'react-toastify';




function Vote({ user, socket }) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '315px',
            height: '300px'
        },
    };

    const [liveVote, setLiveVote] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    let [formStatus, setFormStatus] = useState(false)
    const [voteName, setVoteName] = useState('')
    const [isJoined, setIsJoined] = useState(false);
    const [opt1, setOpt1] = useState('')
    const [opt2, setOpt2] = useState('')
    const [opt3, setOpt3] = useState('')
    const [opt4, setOpt4] = useState('')
    const [selectedOption, setSelectedOption] = useState('');


    useEffect(() => {
        socket.emit('isLiveVote', '')
    }, [])
    useEffect(() => {
        socket.on('liveVotesClient', async (liveVote) => {
            if (liveVote.length > 0) {
                const { voteData } = await liveVote[0];
                setLiveVote(voteData)
                ReactDOM.render(<CreateVoteComponent votename={voteData.voteName} voteusercount={voteData.usersCount} option1={voteData.opt1} option2={voteData.opt2} option3={voteData.opt3} option4={voteData.opt4} />, document.getElementById('create-vote-area'))
            }
        })

        return () => {
            console.log(liveVote)
        }
    }, [])


    useEffect(() => {
        console.log(selectedOption)
    }, [selectedOption])

    let CreateVoteComponent = ({ votename, voteDate, voteusercount, isJoined, option1, option2, option3, option4 }) => {
        return (
            <div className="vote-content">
                <div className="single-vote openSansText">
                    <div className="vote-name">
                        {votename}
                    </div>
                    <div className="joined-count-user">
                        {voteusercount}0 &nbsp;<FaUserAlt className="icon" />
                    </div>
                </div>
                <div className="vote-options">
                    <form>
                        <div>
                            <input disabled={selectedOption !== '' ? true : false} type="radio" onChange = {() => {setSelectedOption(option1)}} name="voteGroup" value={option1} />{option1}

                        </div>
                        <div><input disabled={selectedOption !== '' ? true : false} type="radio" onChange = {() => {setSelectedOption(option2)}} name="voteGroup" value={option2} />{option2}</div>
                        {
                            option3 !== '' ? <div><input disabled={selectedOption !== '' ? true : false} type="radio" onChange = {() => {setSelectedOption(option3)}} name="voteGroup" value={option3} />{option3}</div> : null
                        }
                        {
                            option4 !== '' ? <div><input disabled={selectedOption !== '' ? true : false} type="radio" onChange = {() => {setSelectedOption(option4)}} name="voteGroup" value={option4} />{option4}</div> : null
                        }
                    </form>
                </div>
            </div>
        )
    }


    useEffect(() => {
        socket.on('sendLiveVoteDataClient', (data) => {
            const { voteData } = data;
            ReactDOM.render(<CreateVoteComponent votename={voteData.voteName} voteusercount={voteData.usersCount} />, document.getElementById('create-vote-area'))
        }, [])
        socket.on('liveVoteDataOwner', (data) => {
            if (data.success === true) {
                toast.success('Oylama başladı...');
                const { voteData } = data.data;
                setOpt1('')
                setOpt2('')
                setOpt3('')
                setOpt4('')
                setVoteName('')
                closeModal();
                ReactDOM.render(<CreateVoteComponent votename={voteData.voteName} voteusercount={voteData.usersCount} />, document.getElementById('create-vote-area'))

            }
        })
    }, [])

    const sendVoteRequest = async (e) => {
        let formData = {
            voteName,
            opt1,
            opt2,
            opt3,
            opt4,
            createdData: Date.now(),
            owner: user.username
        }

        socket.emit('createVote', {
            voteOwner: user.username,
            voteData: formData
        })

        e.preventDefault();

    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    function onSetVoteName(e) {
        setVoteName(e)
    }

    function onSetOpt1(e) {
        setOpt1(e)
    }
    function onSetOpt2(e) {
        setOpt2(e)
    }
    function onSetOpt3(e) {
        setOpt3(e)
    }
    function onSetOpt4(e) {
        setOpt4(e)
    }




    let RenderVoteScreenModal = () => {
        return (
            <Modal
                isOpen={isJoined}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <span onClick={closeModal} className="closeModalButton"><IoMdClose /></span>


                <h3>Canlı Durum</h3>
                <hr></hr>
                {/* <Progress percent={44} progress />
                <Progress percent={44} progress />
                <Progress percent={44} progress />
                <Progress percent={44} progress /> */}

            </Modal>
        )
    }

    return (
        <div className="vote-component">

            <RenderVoteScreenModal />
            <div className="vote-top">
                <h2 className="zenKakuText vote-header">Oylama</h2>
                {
                    user.role === 'admin' ? <button onClick={openModal} className="tkButton createVoteBtn"><FaPlus />&nbsp;&nbsp;Yeni</button> : null
                }

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <span onClick={closeModal} className="closeModalButton"><IoMdClose /></span>


                    <h3>Yeni oylama başlat</h3>
                    <hr></hr>

                    <form onSubmit={sendVoteRequest}>
                        <InputWithIcon onChangeEvent={onSetVoteName} type={'text'} value={voteName} icon={<MdHowToVote />} placeholder={'Oylama Adı'} isPasswordInput={false} htmlFor={'communityName'} />
                        <br />
                        <small>Seçenekler(Max:4, Min:2)</small>
                        <InputWithIcon onChangeEvent={onSetOpt1} value={opt1} type={'text'} placeholder={'Zorunlu'} icon={<RiNumber1 />} isPasswordInput={false} />
                        <InputWithIcon onChangeEvent={onSetOpt2} value={opt2} type={'text'} placeholder={'Zorunlu'} icon={<RiNumber2 />} isPasswordInput={false} />
                        <InputWithIcon required={false} onChangeEvent={onSetOpt3} value={opt3} placeholder={'Zorunlu Değil'} type={'text'} icon={<RiNumber3 />} isPasswordInput={false} />
                        <InputWithIcon required={false} onChangeEvent={onSetOpt4} value={opt4} type={'text'} placeholder={'Zorunlu Değil'} icon={<RiNumber4 />} isPasswordInput={false} />

                        <button type="submit" className="tkButton createButton">
                            {
                                formStatus === true ? <img src={SpinnerSVG} width="16" height="16" style={{ position: 'relative', top: '3px' }} /> : "Oluştur"
                            }
                        </button>
                    </form>
                </Modal>
            </div>
            <hr></hr>

            <div id="create-vote-area">

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Vote)

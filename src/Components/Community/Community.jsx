import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './Community.css'
import Modal from 'react-modal';
import InputWithIcon from '../Auth/InputWithIcon/InputWithIcon';
import { FaUserFriends, IoMdClose, BsThreeDots, MdDelete, AiTwotoneEdit, FaPlus, BsCalendar2Date, AiOutlineArrowLeft ,AiFillWarning} from 'react-icons/all'
import { createCommunityRequest } from '../../Service/Community/Create';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import SpinnerSVG from '../../img/spinner.svg'
import { getAllCommunity } from '../../Service/Community/getAllCommunity';
import { bindActionCreators } from 'redux';
import { onAllCommunitiesSave } from '../../Redux/actions/Actions'
import { Link, useHistory } from 'react-router-dom';
import { deleteCommunityRequest } from '../../Service/Community/DeleteCommunity';
import { imageApiUrl } from '../../Service/settings';
import TkLogo from '../../img/tk-logo.png'
import { searchRequest } from '../../Service/Search/SearchRequest';
import { leaveCommunityRequest } from '../../Service/Community/LeaveCommunity';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '315px',
        height: '375px'
    },
};



function Community({ user, ...props }) {


    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [communityName, setCommunityName] = useState("");
    const [communityContent, setCommunityContent] = useState("")
    const [formStatus, setFormStatus] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchBar, setSearchBar] = useState(false)
    const [communityOptions, setCommunityOptions] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const socket = props.socket;
    let history = useHistory()
    const token = props.token;

    useEffect(async () => {
        getAllCommunity(token).then(async (response) => {
            console.log(response.data)
            await props.action(onAllCommunitiesSave(response.data.allCommunities))
        }).catch(err => {
            //toast.error('Topluluklar y??klenirken bir hata olu??tu')
        })
    }, [])


    useEffect(() => {
        if (searchText !== '') {
            setSearchBar(true)

            searchRequest(props.token, searchText).then(response => {
                setSearchResult(response.data.result);
                console.log(response.data.result)
                if (response.data.result.length === 0) {
                    setSearchBar(false)
                }
            }).catch(Err => {
                console.log(Err.response.data)
                toast.error('Bir hata olu??tu.Sayfay?? yenileyin.')
            })
        }
        else {
            setSearchBar(false)
        }
    }, [searchText])


    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }


    let changeCommunityName = (e) => {
        setCommunityName(e)
    }

    let changeCommunityContent = (e) => {
        setCommunityContent(e.target.value)
    }

    let clearInput = () => {
        setCommunityContent("")
        setCommunityName("")
    }

    function NewCommunitySchema({ id, slugName, image, name }) {

        // Linkte sorun var!!!
        return (
            <div className="communityCard" onClick={(e) => { history.push(`/community/${slugName}`) }}>
                <span className="communityImage">
                    <img src={`${imageApiUrl}/${image}`} className="comImage" />
                </span>
                <div className="communityName">
                    <p className="monserratText">{name}</p>
                </div>

                <span className="three-dot-icon" onClick={(e) => { setCommunityOptions(id) }}><BsThreeDots className="three-dot" /></span>


                <span className="communityOptions" style={{ display: communityOptions === id ? 'flex' : 'none' }}>
                    <span id="options-delete" onClick={(e) => { sendDeleteRequestCommunity(e, id) }}>
                        <i><MdDelete /></i>
                        <span className="openSansText">Sil</span>
                    </span>
                    <span id="options-edit">
                        <i><AiTwotoneEdit /></i>
                        <span className="openSansText">D??zenle</span>
                    </span>
                </span>
            </div>
        )

    }


    let deleteDOMElement = (e, id) => {
        document.getElementById(`communityId${id}`).remove();
    }


    let sendDeleteRequestCommunity = (e, id) => {

        deleteCommunityRequest(id, props.token).then(response => {
            deleteDOMElement(e, id);
            history.push('/community')
            toast.success(response.data.message)
        }).catch(error => {
            toast.error("Bir hata olu??tu")
        })
    }


    let sendCreateCommunityRequest = (e) => {
        e.preventDefault();
        setFormStatus(true)
        let formData = {
            communityName,
            communityContent,
            owner: user.username,
            ownerEmail: user.email
        }
        createCommunityRequest(formData).then(response => {


            const { slugName, communityProfileImage, communityName, _id } = response.data.community;

            ReactDOM.render(<NewCommunitySchema id={_id} slugName={slugName} image={communityProfileImage} name={communityName} />, document.getElementById('dynamicCommunityComponent'))

            setTimeout(() => {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    bodyStyle: { fontSize: '14px' }
                })
                clearInput();
            }, 1500);
        }).catch(err => {
            setTimeout(() => {
                toast.success(err.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    bodyStyle: { fontSize: '14px' }

                })
            }, 1500);
        }).finally(final => {
            setTimeout(() => {
                setFormStatus(false)
                setIsOpen(false)
            }, 1500)
        })
    }

    window.addEventListener('click', (e) => {
        const classNameTarget = e.target.classList.value
        if (classNameTarget !== 'three-dot') {
            setCommunityOptions(null)
        }
    })

    let onSetSearchText = (e) => {
        setSearchText(e)
    }



    let onJoinCommunity = (e, id) => {

        socket.emit('SaveCommunityToUser', {
            username: user.username,
            communityId: id
        })

        socket.emit('SaveUserToCommunity', {
            username: user.username,
            communityId: id
        })

        setSearchBar(false)
        toast.success("Bir toplulu??a kat??ld??n??z.")
    }


    let sendLeaveRequestCommunity = (e,id) => {
        leaveCommunityRequest(props.token,id,user.username).then(res => {
            if(res.data.success === true){
                toast.success(res.data.message);
                history.push('/community')

                e.target.parentElement.parentElement.parentElement.remove();
            }
            else{
                toast.error("Bir hata olu??tu")
            }
        }).catch(Err => {
            console.log(Err?.response)
        })
    }


    return (
        <div className="community-component">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover

            />
            <div className="community-top">
                <h2 className="zenKakuText community-header">Topluluk</h2>
                {
                    user.role === 'admin' ? <button onClick={openModal} className="tkButton createCommunityBtn"><FaPlus />&nbsp;&nbsp;Topluluk Olu??tur</button> : <form style={{ marginRight: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center',width:'230px',paddingRight:"10px"}}><InputWithIcon placeholder="Bir topluluk ara... ??r: Teneke Kafalar" style = {{width:"230px"}} value={searchText} onChangeEvent={onSetSearchText} icon={<FaUserFriends />} required={true} /></form>
                }
            </div>
            <hr></hr>

            {
                user.role === 'admin' ? null
                    :
                    <div className="search-community-area" style={{ display: searchBar === true ? 'flex' : 'none' }}>

                        <div className="result-div">
                            {
                                searchResult.map(res => (
                                    <div className="result-community" key={res._id}>
                                        <span className="communityProfileImage">
                                            <img src={`${imageApiUrl}/${res.communityProfileImage}`} width="38" height="38"></img>
                                        </span>
                                        <span className="communityName poppinsText">
                                            {res.communityName}
                                        </span>
                                        {
                                            res.members.indexOf(user.username) === -1 ? <button className="tkButton joinCommunityButton" onClick={(e) => { onJoinCommunity(e, res._id) }}>Kat??l</button> : <span className="poppinsText" style={{ fontSize: "10px" }}>Kat??ld??n</span>
                                        }
                                    </div>
                                ))
                            }

                        </div>
                    </div>
            }

            <div className="listOfCommunity">
                <div className="myMembersCommunity">
                    {
                        props.communities.length > 0 ? props.communities.map(community => (
                            <Link key={community._id} id={`communityId${community._id}`} to={`/community/${community.slugName}`} className="communityCard">
                                <span className="communityImage">
                                    <img src={`${imageApiUrl}/${community.communityProfileImage}`} className="comImage" />
                                </span>
                                <div className="communityName">
                                    <p className="monserratText">{community.communityName}</p>
                                </div>
                                <span className="createdDate"><BsCalendar2Date />&nbsp;&nbsp;{community.createdDate.split('T')[0]}</span>


                                <span className="three-dot-icon" onClick={(e) => { setCommunityOptions(community._id) }}><BsThreeDots className="three-dot" /></span>
                                {
                                    user.role === 'admin' ? <span className="communityOptions" style={{ display: communityOptions === community._id ? 'flex' : 'none' }}>
                                        <span id="options-delete" onClick={(e) => { sendDeleteRequestCommunity(e, community._id) }}>
                                            <i><MdDelete /></i>
                                            <span className="openSansText">Sil</span>
                                        </span>
                                    </span> : <span className="communityOptions" style={{ display: communityOptions === community._id ? 'flex' : 'none' }}>
                                        <span id="options-delete" onClick = {(e) => {sendLeaveRequestCommunity(e,community._id)}}>
                                            <i><AiOutlineArrowLeft /></i>
                                            <span className="openSansText">Ayr??l</span>
                                        </span>
                                    </span>
                                }



                            </Link>

                        )) : <div className = "notFoundCommunity poppinsText"><AiFillWarning />&nbsp;&nbsp;Herhangi bir toplulu??a kat??lmad??n.</div>
                    }
                    <div id="dynamicCommunityComponent"></div>
                </div>
                <div className="community-data">

                    {props.component}

                </div>
            </div>








            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <span onClick={closeModal} className="closeModalButton"><IoMdClose /></span>


                <h3>Topluluk Olu??tur</h3>
                <hr></hr>
                <form onSubmit={sendCreateCommunityRequest}>
                    <InputWithIcon onChangeEvent={changeCommunityName} type={'text'} style={{ width: "88%" }} icon={<FaUserFriends />} placeholder={'Topluluk Ad??'} isPasswordInput={false} htmlFor={'communityName'} />
                    <textarea value={communityContent} onChange={changeCommunityContent} className="mt20 openSansText" maxLength="500" placeholder="Topluluk A????klamas??" rows="5" cols="30" style={{ borderRadius: '8px', border: '1px solid lightgray', paddingLeft: "5px", paddingTop: "5px", outline: 'none' }}></textarea>
                    <br />
                    <small>Profil resmini topluluk ayarlar??ndan de??i??tirin.</small>
                    <button type="submit" className="tkButton createButton">
                        {
                            formStatus === true ? <img src={SpinnerSVG} width="16" height="16" style={{ position: 'relative', top: '3px' }} /> : "Olu??tur"
                        }

                    </button>
                </form>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(onAllCommunitiesSave, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community)

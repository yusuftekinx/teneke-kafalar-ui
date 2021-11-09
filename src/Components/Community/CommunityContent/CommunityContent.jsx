import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import './CommunityContent.css'
import { imageApiUrl } from '../../../Service/settings'
import { IoMdImages } from 'react-icons/all'
import { uploadProfileImageRequest } from '../../../Service/Community/updateProfileImage'
import { toast } from 'react-toastify'

export const CommunityContent = (props) => {


    let params = useParams();
    const [singleCommunity, setSingleCommunity] = useState(null);

    useEffect(async () => {
        const filterCommunity = await props.communities.filter(community => community.slugName === params.slugName);
        await setSingleCommunity(filterCommunity[0]);
    })


    const formData = new FormData();

    let uploadImageFile = async (e) => {
        formData.append('communityImage', e.target.files[0])
        await uploadProfileImageRequest(formData, props.token, singleCommunity._id).then(response => {
            toast.success(response.data.message);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="single-community">
            <h3 className="communityName">{singleCommunity?.communityName}</h3><br></br>
            <div className="communityImageAndContent">
                {
                    props.user.role === 'admin' ? <input title="Topluluk Profil Resmini Değiştir" onChange={uploadImageFile} type="file" className="inputImageFile" /> : null
                }
                <img alt={'Community Profile Image'} className="communityImage" draggable="false" src={`${imageApiUrl}/${singleCommunity?.communityProfileImage}`}></img>
                {
                    props.user.role === 'admin' ? <span title="Profil Resmini Güncelle" className="changeProfilePhotoIcon"><IoMdImages className="icon" /></span>
                        : null
                }
                <p className="zenText communityContentText">{singleCommunity?.communityContent}</p>
            </div>


        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(CommunityContent)

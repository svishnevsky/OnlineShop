import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getCropUrl } from '../../utils/common'
import $ from 'jquery'
import '../../../../scripts/jquery.elevateZoom-3.0.3.min.js'

const defaults = {
    gallery: 'gallery_01',
    zoomType: 'inner',
    cursor: 'crosshair',
    galleryActiveClass: 'active',
    imageCrossfade: true,
    loadingIcon: '/images/spinner.gif'
}

export default class ProductImages extends Component {
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).find('#mainImage').elevateZoom(defaults);
    }

    render() {
        return (
            <div className='product_img'>
                <img id='mainImage' src={getCropUrl(this.props.images[0].url, 330)} className='headPhoto' data-zoom-image={this.props.images[0].url} alt={this.props.images[0].name} />
                <div id='gallery_01' className='thumbs'>
                    {this.props.images.map((img, index) =>
                        <a key={index} data-image={getCropUrl(img.url, 330)} data-zoom-image={img.url}>
                            <img id={`img_${index}`} className='thumb_fix' src={getCropUrl(img.url, 60)} />
                        </a>)
                    }
                </div>
            </div>
        );
    }
}
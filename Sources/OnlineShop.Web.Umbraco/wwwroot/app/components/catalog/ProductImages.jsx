import React, { Component } from 'react'
import { getCropUrl } from '../../utils/common'

export default class ProductImages extends Component {
    render() {
        return (
            <div className='product_img'>
                <div className='zoomWrapper'>
                    <img id='img_main' src={getCropUrl(this.props.images[0].url, 450)} className='headPhoto' data-zoom-image={this.props.images[0].url} alt={this.props.images[0].name} />
                </div>
                <div id='gallery_01'>
                    <div className='thumbs'>
                        <div className='thumbs_w'>
                            {this.props.images.map(img =>
                                <a key={img.url} data-image={getCropUrl(img.url, 450)} data-zoom-image={img.url}>
                                    <img id={`img_${img.name}`} className='thumb_fix' src={getCropUrl(img.url, 60)} />
                                </a>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
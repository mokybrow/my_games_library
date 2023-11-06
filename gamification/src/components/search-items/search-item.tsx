import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import './search-item.css'

export interface SearchItemProps {
    tag: string
    ItemSlug: string
    ItemCover: string | null
    ItemTitle: string
}


const SearchItem: FC<SearchItemProps> = ({ tag, ItemSlug, ItemCover, ItemTitle }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tagParam = searchParams.get('tag');
    return (
        <Link to={`/${tagParam}/` + ItemSlug}>
            <div className="search-item-card-cover-container">
                {ItemCover !== null ?
                    <img src={tagParam === 'game' ? ItemCover :`data:image/jpeg;base64,${ItemCover}`  }  width={50} height={50} />
                    : null
                }
                <div className="title-card-body">
                    <div className="title-card">
                        <span className="card-title">{ItemTitle}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default observer(SearchItem);
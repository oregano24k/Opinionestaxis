import React from 'react';
import { GroundingChunk } from '../types';

interface SourceLinkProps {
    source: GroundingChunk;
}

const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
    if (!source.web || !source.web.uri) {
        return null;
    }

    const { uri, title } = source.web;
    const displayTitle = title || uri;
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${uri}`;

    return (
        <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 my-2 transition-all duration-300 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:shadow-md hover:scale-105"
        >
            <img src={faviconUrl} alt="favicon" className="w-6 h-6 mr-3 rounded-full" />
            <span className="text-sm text-cyan-700 hover:text-cyan-800">{displayTitle}</span>
        </a>
    );
};

export default SourceLink;
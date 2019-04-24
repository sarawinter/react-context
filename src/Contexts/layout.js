import React from 'react';

export const layout = {
    hero: {
        headerFont: 'Iceland',
        headerText: 'Hero',
        imageStyle: {
            float: 'left',
            marginRight: '20px',
            maxWidth: '250px'
        }
    },
    villain: {
        headerFont: 'Nosifer',
        headerText: 'Villain',
        imageStyle: {
            float: 'right',
            marginLeft: '20px',
            maxWidth: '250px'
        }
    },
    sidekick: {
        headerFont: 'Keania One',
        headerText: 'Sidekick',
        imageStyle: {
            float: 'right',
            marginLeft: '20px',
            maxWidth: '200px'
        }
    },
};

export const LayoutContext = React.createContext(
    layout.sidekick // default value
);
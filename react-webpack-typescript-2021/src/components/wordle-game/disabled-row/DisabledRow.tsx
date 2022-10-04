import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import '../complete-row/CompleteRow.less';

interface Props {
    rowIndex: number
}


const DisabledRow: React.FC<Props> = ({ rowIndex }) => {
    return (
        <>
            {' '.repeat(5).split('').map((letter, index) =>
                <div key={`row-${rowIndex}-letter-${index}`} className={`wordleLetter wordleLetterdisabled`}>{letter.toUpperCase()}</div>
            )}
        </>
    );
};

export default hot(module)(DisabledRow);

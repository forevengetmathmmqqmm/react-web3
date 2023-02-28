import React, {useState} from 'react';
const Web3 = require('web3');
import '../style/web3.css'
function WebThree () {
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    web3.eth.requestAccounts().then(res => {
        console.log(res);
    });
    const [blockNum, setBlockNum ] = useState(0);
    const [id, setId] = useState(1);
    const [balance, setBalance] = useState(1);
    web3.eth.getBlockNumber().then(res => {
        setBlockNum(res);
    });
    web3.eth.getChainId().then(res => {
        setId(res);
    });
    web3.eth.getBalance("0x36953b5cB783E80275250ca9708090d7E63742C9").then(res => {
        console.log(res);
        setBalance(web3.utils.fromWei(res, 'ether'));
    });
    web3.eth.getAccounts()
    .then(res => {
        console.log(res);
    });
    function conntectFox(params) {
        web3.eth.sendTransaction({
            from: '0x36953b5cB783E80275250ca9708090d7E63742C9',
            to: '0x21Ab88105E1ea1E9904C16a2BA21144786994764',
            value: web3.utils.toWei('100', 'ether')
        })
        .then(function(receipt){
            web3.eth.getBalance("0x36953b5cB783E80275250ca9708090d7E63742C9").then(res => {
                console.log(res);
                setBalance(web3.utils.fromWei(res, 'etsher'));
            });
        });
    }
    return (
        <div>
            <div className='title mx-auto text-xs'>
                <span>WEB3</span>
            </div>
            <div className='web3-main' onClick={conntectFox}>
                <button>连接小狐狸</button>
            </div>
            <div>当前区块{blockNum}</div>
            <div>当前链id{id}</div>
            <div>余额{balance}</div>


        </div>
    )
}
export default WebThree;
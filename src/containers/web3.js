import React, {useState} from 'react';
const Web3 = require('web3');
import '../style/web3.css';
import contractsApi from '../utils/contracts.json';
let networks = new Object(contractsApi.networks);

function WebThree () {
    const [blockNum, setBlockNum ] = useState(0);
    const [id, setId] = useState(1);
    const [balance, setBalance] = useState(1);
    const [contractApi, setContractApi] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    async function getAccount() {
      let res = await web3.eth.getAccounts()
      setAccount(res);
    }
    function conntectFox(params) {
        let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        setWeb3(web3);
        web3.eth.requestAccounts().then(res => {
            console.log(res);
        });
    }
    function sendTransaction() {
        web3.eth.sendTransaction({
            from: '0x8Ce73B72Cc5d76Ac50D233c9193a54A8Ed1779e5',
            to: '0x06E83b9F0B76b6A79B596C82b05CCb139a2Ce959',
            value: web3.utils.toWei('100', 'ether')
        })
        .then(function(receipt){
            web3.eth.getBalance("0x8Ce73B72Cc5d76Ac50D233c9193a54A8Ed1779e5").then(res => {
                console.log(res);
                setBalance(web3.utils.fromWei(res, 'ether'));
            });
        });
    }
    async function connetContract() {
        web3.eth.defaultAccount = '0x220422E9ccbc84db42B17faD9f1cA4E924a92BEc';
        let contractData = await new web3.eth.Contract(contractsApi.abi, '0x4f78F062635166B4B9e8F96402440E8f2a93e84f');
        setContractApi(contractData);
        console.log('contractData', contractData);
    }
    function methdsApi() {
        console.log('asd', web3.eth.defaultAccount);
        contractApi.methods.setStudents('lc', 18).send();
    }
    return (
        <div>
            <div className='title mx-auto text-xs'>
                <span>WEB3</span>
            </div>
            <div className='web3-main' onClick={conntectFox}>
                <button>连接小狐狸</button>
            </div>
            <div className='web3-main' onClick={getAccount}>
                <button>获取钱包账户</button>
            </div>
            <div className='web3-main' onClick={sendTransaction}>
                <button>发送交易</button>
            </div>
            <div className='web3-main' onClick={connetContract}>
                <button>连接合约</button>
            </div>
            <div className='web3-main' onClick={methdsApi}>
                <button>调用合约方法</button>
            </div>
            <div>当前区块{blockNum}</div>
            <div>当前链id{id}</div>
            <div>余额{balance}</div>


        </div>
    )
}
export default WebThree;
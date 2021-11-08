console.log("hello dapp developers!")

// address of contract deployment
const  ssAddress = '0xb786FC135aEBf4f8a1829114738ad3b9ae79F8D0'

const ssABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// 1. detect MetaMask is / is not installed

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask detected!')
    let mmDetected = document.getElementById('mm-detected')    
    mmDetected.innerHTML = "MetaMask Has Been Detected!"
    }

    else {
        console.log('There is no Wallet!')
        alert("You need to install MetaMask or another wallet!")
    }
})

const mmEnable = document.getElementById('mm-connect');
// mmEnable.onclick = () => {
//     console.log('Beep!')
// }

mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts'})

    const mmCurrentAccount = document.getElementById('mm-current-account');

    mmCurrentAccount.innerHTML = "Here's your current account" + ethereum.selectedAddress
}


const ssSubmit = document.getElementById('ss-input-button')

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    console.log(ssValue)

    var web3 = new Web3(window.ethereum)

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

    // simpleStorage.setProvider(window.ethereum)

    await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress})
}
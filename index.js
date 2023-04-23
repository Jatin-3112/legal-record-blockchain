import { ethers } from "./dist/ethers.min.js";

const contractAddress = "0x4fB3Bb312BDAf5B35AAd151C4660fA9FC8b3548a";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_evidence",
                "type": "string"
            }
        ],
        "name": "addEvidence",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_testimony",
                "type": "string"
            }
        ],
        "name": "addWitnessTestimony",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_plaintiffLawyer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_defendantLawyer",
                "type": "address"
            }
        ],
        "name": "createCase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "plaintiffLawyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "defendantLawyer",
                "type": "address"
            }
        ],
        "name": "CaseCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "evidence",
                "type": "string"
            }
        ],
        "name": "EvidenceAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "judge",
                "type": "address"
            }
        ],
        "name": "JudgeSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "judgment",
                "type": "string"
            }
        ],
        "name": "JudgmentSet",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_caseId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_judge",
                "type": "address"
            }
        ],
        "name": "setJudge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_judgment",
                "type": "string"
            }
        ],
        "name": "setJudgment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "testimony",
                "type": "string"
            }
        ],
        "name": "WitnessTestimonyAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getCase",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "plaintiffLawyer",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "defendantLawyer",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "judge",
                        "type": "address"
                    },
                    {
                        "internalType": "string[]",
                        "name": "evidences",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "witnessTestimonies",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "judgment",
                        "type": "string"
                    },
                    {
                        "internalType": "enum LegalRecord.State",
                        "name": "state",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct LegalRecord.Case",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

let signer = null;

let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)
    console.log("MetaMask installed; using provider", provider)

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
    console.log("Signer", signer)
}

document.getElementById("registration").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseDescription = document.getElementById("caseDescription").value;
    const plaintiffLawyer = document.getElementById("plaintiffLawyer").value;
    const defendantLawyer = document.getElementById("defendantLawyer").value;
    contract.createCase(caseDescription, plaintiffLawyer, defendantLawyer);
});

document.getElementById("assign-judge").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseId = document.querySelector("#assign-judge #caseID").value;
    const judge = document.getElementById("judge").value;
    contract.setJudge(caseId, judge);
});

document.getElementById("submit-evidence").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseId = document.querySelector("#submit-evidence #caseID").value;
    const evidence = document.getElementById("evidence").value;
    contract.addEvidence(caseId, evidence);
});

document.getElementById("submit-testimony").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseId = document.querySelector("#submit-testimony #caseID").value;
    const testimony = document.getElementById("testimony").value;
    contract.addWitnessTestimony(caseId, testimony);
});

document.getElementById("submit-verdict").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseId = document.querySelector("#submit-verdict #caseID").value;
    const verdict = document.getElementById("verdict").value;
    contract.setJudgment(caseId, verdict);
});

document.getElementById("get-case").addEventListener("submit", async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const caseId = document.querySelector("#get-case #caseID").value;
    const caseDetails = await contract.getCase(caseId);
    console.log(caseDetails);
    document.getElementById("case-details").innerText = caseDetails;
});
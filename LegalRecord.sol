pragma solidity ^0.8.0;

contract LegalRecord {
    enum State { PENDING, IN_PROGRESS, CLOSED }

    // The evidences and witness testimonies are actually
    // IPFS hashes of the actual evidence or testimony
    struct Case {
        uint256 id;
        string description;
        uint256 timestamp;
        address plaintiffLawyer;
        address defendantLawyer;
        address judge;
        string[] evidences;
        string[] witnessTestimonies;
        string judgment;
        State state;
    }

    uint256 private caseCounter;
    address court;
    mapping(uint256 => Case) private cases;

    event CaseCreated(uint256 caseId, string description, uint256 timestamp, address plaintiffLawyer, address defendantLawyer);
    event EvidenceAdded(uint256 caseId, string evidence);
    event WitnessTestimonyAdded(uint256 caseId, string testimony);
    event JudgmentSet(uint256 caseId, string judgment);
    event JudgeSet(uint256 caseId, address judge);

    constructor() {
        // Set the contract creator as the court
        court = msg.sender;
    }

    modifier onlyCourt() {
        require(msg.sender == court, "Only the court can perform this action");
        _;
    }

    modifier onlyLawyers(uint256 caseId) {
        require(msg.sender == cases[caseId].plaintiffLawyer || msg.sender == cases[caseId].defendantLawyer, "Only lawyers can perform this action");
        _;
    }

    modifier onlyJudge(uint256 caseId) {
        require(msg.sender == cases[caseId].judge, "Only the judge can perform this action");
        _;
    }

    modifier onlyPartiesInvolvedInCase(uint256 caseId) {
        require(msg.sender == court || msg.sender == cases[caseId].plaintiffLawyer || msg.sender == cases[caseId].defendantLawyer || msg.sender == cases[caseId].judge, "Only the parties involved in this case can perform this action");
        _;
    }

    function createCase(string memory _description, address _plaintiffLawyer, address _defendantLawyer) public onlyCourt {
        caseCounter++;
        cases[caseCounter] = Case(caseCounter, _description, block.timestamp, _plaintiffLawyer, _defendantLawyer, address(0), new string[](0), new string[](0), "", State.PENDING);
        emit CaseCreated(caseCounter, _description, block.timestamp, _plaintiffLawyer, _defendantLawyer);
    }

    function getCase(uint256 _id) public view onlyPartiesInvolvedInCase(_id) returns (Case memory) {
        return cases[_id];
    }

    function setJudge(uint256 _caseId, address _judge) public onlyCourt {
        cases[_caseId].judge = _judge;
        cases[_caseId].state = State.IN_PROGRESS;
        emit JudgeSet(_caseId, _judge);
    }

    function addEvidence(uint256 _caseId, string memory _evidence) public onlyLawyers(_caseId) {
        cases[_caseId].evidences.push(_evidence);
        emit EvidenceAdded(_caseId, _evidence);
    }

    function addWitnessTestimony(uint256 _caseId, string memory _testimony) public onlyLawyers(_caseId) {
        cases[_caseId].witnessTestimonies.push(_testimony);
        emit WitnessTestimonyAdded(_caseId, _testimony);
    }

    function setJudgment(uint256 _caseId, string memory _judgment) public onlyJudge(_caseId) {
        cases[_caseId].judgment = _judgment;
        cases[_caseId].state = State.CLOSED;
        emit JudgmentSet(_caseId, _judgment);
    }
}

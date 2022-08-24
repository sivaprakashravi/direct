export class Chart {
    "pName": string;
    "totalAcc": string;
    "totalPert": string;
    "totalAccNorm": string;
    "totalPertNorm": string;
    "pAcc": string;
    "pORA": string;
    "pComb": string;
    "identifier": string;
    "pAcc_fdr": string;
    "pORA_fdr": string;
    "pComb_fdr": string;
    "pAcc_bonferroni": string;
    "pORA_bonferroni": string;
    "pComb_bonferroni": string;
    "path_size": string;
    "pathID": string;
    "pv": string;
    "pv_fdr": string;
    "pv_bonferroni": string;
    "nEvidence": string;
    "countDE": string;
    "countAll": string;

    constructor(obj: Chart) {
        this.pName = obj.pName;
        this.totalAcc = obj.totalAcc;
        this.totalPert = obj.totalPert;
        this.totalAccNorm = obj.totalAccNorm;
        this.totalPertNorm = obj.totalPertNorm;
        this.pAcc = obj.pAcc;
        this.pORA = obj.pORA;
        this.pComb = obj.pComb;
        this.identifier = obj.identifier;
        this.pAcc_fdr = obj.pAcc_fdr;
        this.pORA_fdr = obj.pORA_fdr;
        this.pComb_fdr = obj.pComb_fdr;
        this.pAcc_bonferroni = obj.pAcc_bonferroni;
        this.pORA_bonferroni = obj.pORA_bonferroni;
        this.pComb_bonferroni = obj.pComb_bonferroni;
        this.path_size = obj.path_size;
        this.pathID = obj.pathID;
        this.pv = obj.pv;
        this.pv_fdr = obj.pv_fdr;
        this.pv_bonferroni = obj.pv_bonferroni;
        this.nEvidence = obj.nEvidence;
        this.countDE = obj.countDE;
        this.countAll = obj.countAll;
    }
}

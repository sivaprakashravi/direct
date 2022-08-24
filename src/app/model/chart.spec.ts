import { Chart } from './chart';

describe('Chart', () => {
  it('should create an instance', () => {
    const obj = {
      "pName": "test",
    "totalAcc": "test",
    "totalPert": "test",
    "totalAccNorm": "test",
    "totalPertNorm": "test",
    "pAcc": "test",
    "pORA": "test",
    "pComb": "test",
    "identifier": "test",
    "pAcc_fdr": "test",
    "pORA_fdr": "test",
    "pComb_fdr": "test",
    "pAcc_bonferroni": "test",
    "pORA_bonferroni": "test",
    "pComb_bonferroni": "test",
    "path_size": "test",
    "pathID": "test",
    "pv": "test",
    "pv_fdr": "test",
    "pv_bonferroni": "test",
    "nEvidence": "test",
    "countDE": "test",
    "countAll": "test"
    }
    expect(new Chart(obj)).toBeTruthy();
  });
});

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findEl } from './spec-helper';
import { TwoWayPlotDirective } from './two-way-plot.directive';


const data = [{ "pName": "Pathways in cancer", "totalAcc": "355.724960066561", "totalPert": "656.963683126764", "totalAccNorm": "2.85340477392621", "totalPertNorm": "2.85296776082527", "pAcc": "0.00699650174912544", "pORA": "6.83855149725641E-11", "pComb": "1.38375801040009E-07", "identifier": "11202", "pAcc_fdr": "0.120689655172414", "pORA_fdr": "1.10784534255554E-08", "pComb_fdr": "0.0000172810910374097", "pAcc_bonferroni": "1", "pORA_bonferroni": "2.21569068511108E-08", "pComb_bonferroni": "0.0000286437908152819", "path_size": "531", "pathID": "11202", "pv": "1.38375801040009E-07", "pv_fdr": "0.0000270486642324674", "pv_bonferroni": "0.000044833759536963", "nEvidence": "2", "countDE": "108", "countAll": "519" }, { "pName": "PI3K-Akt signaling pathway", "totalAcc": "240.055355696033", "totalPert": "434.384162683572", "totalAccNorm": "2.79124336234405", "totalPertNorm": "2.49301645098674", "pAcc": "0.0104947526236882", "pORA": "2.08216591211432E-08", "pComb": "2.03308445552882E-07", "identifier": "11163", "pAcc_fdr": "0.144827586206897", "pORA_fdr": "0.00000134924351105008", "pComb_fdr": "0.0000172810910374097", "pAcc_bonferroni": "1", "pORA_bonferroni": "0.00000674621755525039", "pComb_bonferroni": "0.0000420848482294465", "path_size": "354", "pathID": "11163", "pv": "2.03308445552882E-07", "pv_fdr": "0.0000270486642324674", "pv_bonferroni": "0.0000658719363591337", "nEvidence": "2", "countDE": "74", "countAll": "346" }, { "pName": "Focal adhesion", "totalAcc": "171.343109792834", "totalPert": "292.90729206728", "totalAccNorm": "2.64684273364668", "totalPertNorm": "2.48128481767456", "pAcc": "0.0144927536231884", "pORA": "8.65049269201727E-07", "pComb": "2.7608140670379E-07", "identifier": "11699", "pAcc_fdr": "0.166666666666667", "pORA_fdr": "0.0000311417736912622", "pComb_fdr": "0.0000172810910374097", "pAcc_bonferroni": "1", "pORA_bonferroni": "0.00028027596322136", "pComb_bonferroni": "0.0000571488511876846", "path_size": "201", "pathID": "11699", "pv": "2.7608140670379E-07", "pv_fdr": "0.0000270486642324674", "pv_bonferroni": "0.0000894503757720281", "nEvidence": "2", "countDE": "46", "countAll": "198" }];
const changes = {
  selectedItem: {
    currentValue: 10,
    previousValue: 1
  },
  sigThr: {
    currentValue: 10,
    previousValue: 1
  },
  data: {
    currentValue: data,
    previousValue: []
  }
}
@Component({
  template: `
  <div twoWayPlot 
  [data]="data"
  axisYLabel="axisYLabel"
  axisXLabel="axisXLabel"
  numTicks="5"
  sigLabel="20"
  correction="10"
  upType="1"
  item="item"
  showXThreshold="true"
  showYThreshold="true"
  itemLabel="chemicalName"
  data-testid="chart"></div>
  `
})
class HostComponent {}
fdescribe('TwoWayPlotDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let chart: HTMLInputElement;
  let directiveEl: DebugElement;
  let directiveInstance: TwoWayPlotDirective;
  let margin = 40;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoWayPlotDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    chart = fixture.debugElement.nativeElement.querySelector(".chart-container");
    directiveEl = fixture.debugElement.query(By.directive(TwoWayPlotDirective));
    directiveInstance = directiveEl.injector.get(TwoWayPlotDirective);
  });

  it('does not set the class initially', () => {
    expect(chart.classList.contains('chart-container')).toBe(true);
  });

  it('chart element to be defined', () => {
    const els = findEl(fixture, 'chart');
    expect(els).toBeDefined();
  });

  it('Directive Element not to be null', () => {
    expect(directiveEl).not.toBeNull();
  });

  it('axisXLabel defined', () => {
    expect(directiveInstance.axisXLabel).toBe("axisXLabel");
  });

  it('axisYLabel defined', () => {
    expect(directiveInstance.axisYLabel).toBe("axisYLabel");
  });

  it('correction defined', () => {
    expect(directiveInstance.correction).toBe("10");
  });

  it('svg initialized and view created', () => {
    directiveInstance.updateSelection("1", "2");
    directiveInstance.updateData(data, "10", 1);
    directiveInstance.ngOnChanges(changes);
    fixture.detectChanges();
    const svg = fixture.debugElement.nativeElement.querySelector("svg.chart");
    expect(svg.childElementCount).toBe(3);
  });

  it('svg resize validated', () => {
    const defaultSvg = {
      clientWidth: 0, clientHeight: 0
    }
    const svg1 = fixture.debugElement.nativeElement.querySelector("svg.chart");
    defaultSvg.clientWidth = svg1.clientWidth;
    defaultSvg.clientHeight = svg1.clientHeight;
    directiveInstance.onResize();
    fixture.detectChanges();
    const svg2 = fixture.debugElement.nativeElement.querySelector("svg.chart");
    expect(svg2.childElementCount).toBe(3);
    expect(svg2.clientWidth).toBe(defaultSvg.clientWidth + margin);
    expect(svg2.clientHeight).toBe(defaultSvg.clientHeight + margin);
  });

});

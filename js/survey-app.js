import html from './html.js';
import productApi from '../api/product-api.js';
import surveyApi from '../api/survey-api.js';
import ProductSelector from './product-selector.js';
import SurveyChart from '../js/survey-chart.js';

const products = productApi.getAll();

function makeTemplate() {
    return html`
        <header>
            <div>
                <h1>BusMall</h1>
            </div>
            <nav>
                <a href="./">Home</a>
            </nav>
        </header>
        <main> 
            <section>  
                <h2>Product Survey</h2>
            </section>
            <section class="survey-chart"></section>
        </main>`;
}

class SurveyApp {
    constructor() {
        this.surveyChart = surveyApi.getAll();
    }

    render() {
        const dom = makeTemplate();

        const mainSection = dom.querySelector('main');
        
        const productSelector = new ProductSelector(products, survey => {
            surveyApi.add(survey);
            window.location = './report.html';
        });

        mainSection.appendChild(productSelector.render());

        return dom;
    }
}

const surveyApp = new SurveyApp();
document.getElementById('root').appendChild(surveyApp.render());
import {test, expect} from '@playwright/test'

test('working with tables', async ({page}) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    const tableContainer = await page.locator('#countries')

    const rows = await tableContainer.locator('tr').all()

    console.log(`Numeros de filas: ${rows.length}`)

    interface Country {
        name: string
        capital: string
        currency: string
        primaryLanguage: string
    }

    const countries: Country[] = []

    for(let row of rows) {
        const country: Country = {
            name: await row.locator('td:nth-child(2)').innerText(),
            capital: await row.locator('td:nth-child(3)').innerText(),
            currency: await row.locator('td:nth-child(4)').innerText(),
            primaryLanguage: await row.locator('td:nth-child(5)').innerText()
        }

        countries.push(country)
    }

    // for(let country of countries) {
    //     console.log(country)
    // }

    const countryWhereSpeakPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese')

    console.log(countryWhereSpeakPortuguese)
})

/*

element container: //tablee[@id='countries']
.//tr -> filas

//table[@id='countries']//tr[2]//td[1] -> Check
//table[@id='countries']//tr[2]//td[2] -> Country
//table[@id='countries']//tr[2]//td[3] -> Capital
//table[@id='countries']//tr[2]//td[4] -> Currency
//table[@id='countries']//tr[2]//td[5] -> Primary Language

*/
import { test, expect } from '@playwright/test';

test('test prueba', async ({ page }) => {

  //ABRIR UNA PAGINA
  await page.goto('https://www.mercadolibre.com.co');

  //BUSCAR UN INPUT Y DESPUES RELLENARLO
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone');

  //INTERACTUAR CON EL TECLADO
  await page.keyboard.press('Enter');

  //ESPERA A QUE CARGUE LA PAGINA HASTA QUE EL ELEMENTO SEA VISIBLE
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();

  //PAUSA LA EJECUCION DEL TEST
  await page.pause();

  //GUARDAR EL TEXTO DE CADA UNO DE LOS ELEMENTOS EN UNA VARIABLES PARA DESPUES MOSTRARLOS POR CONSOLA
  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]/li//h2').allInnerTexts()

  console.log('TOTAL DE ELEMENTOS ENCONTRADOS: ' + titles.length);
  for (let title = 0; title < titles.length; title++) {
    console.log(titles[title]);
  }
  await page.pause();
});
const fs = require('node:fs')

const COLUMN_NAMES = {
  id: 'id',
  name: 'name',
  brandId: 'brand_id',
}

function escapeString(str) {
  if (typeof str !== 'string') return str
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\')
}

function prepareBrandMapping(brandsData) {
  const brandMapping = {}
  brandsData.forEach((brand) => {
    brandMapping[brand.name.toLowerCase()] = brand.id
  })
  return brandMapping
}

function prepareJsonData(inputFile, brandMapping) {
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
  return data.map((model) => {
    const manufacturerName =
      model.manufacturer.engTitle || model.manufacturer.title
    return {
      id: model.id,
      name: escapeString(model.engTitle || model.title),
      brandId: manufacturerName
        ? brandMapping[manufacturerName.toLowerCase()]
        : null,
    }
  })
}

function generateSqlQuery(models) {
  const filteredModels = models.filter((model) => model.brandId !== null)
  const values = filteredModels
    .map((model) => {
      return `(${model.id}, E'${model.name}', ${model.brandId})`
    })
    .join(',\n')

  const sqlQuery = `
-- Insert data into models table
INSERT INTO models (${COLUMN_NAMES.id}, ${COLUMN_NAMES.name}, ${COLUMN_NAMES.brandId})
VALUES
${values}
ON CONFLICT (${COLUMN_NAMES.id}) DO UPDATE
SET ${COLUMN_NAMES.name} = EXCLUDED.${COLUMN_NAMES.name},
    ${COLUMN_NAMES.brandId} = EXCLUDED.${COLUMN_NAMES.brandId};
`

  return sqlQuery
}

// Usage
const brandsData = [
  {
    id: 10,
    name: 'baw',
  },
  {
    id: 11,
    name: 'denza',
  },
  {
    id: 12,
    name: 'eveasy',
  },
  {
    id: 13,
    name: 'ram',
  },
  {
    id: 14,
    name: 'xpeng',
  },
  {
    id: 15,
    name: 'zeekr',
  },
  {
    id: 16,
    name: 'audi',
  },
  {
    id: 17,
    name: 'abarth',
  },
  {
    id: 18,
    name: 'autobianchi',
  },
  {
    id: 19,
    name: 'oldsmobile',
  },
  {
    id: 20,
    name: 'austin',
  },
  {
    id: 21,
    name: 'opel',
  },
  {
    id: 22,
    name: 'ora',
  },
  {
    id: 23,
    name: 'aiways',
  },
  {
    id: 24,
    name: 'iveco',
  },
  {
    id: 25,
    name: 'infiniti',
  },
  {
    id: 26,
    name: 'isuzu',
  },
  {
    id: 27,
    name: 'levc',
  },
  {
    id: 28,
    name: 'lti',
  },
  {
    id: 29,
    name: 'alfa romeo',
  },
  {
    id: 30,
    name: 'alpine',
  },
  {
    id: 31,
    name: 'mg',
  },
  {
    id: 32,
    name: 'aston martin',
  },
  {
    id: 33,
    name: 'few',
  },
  {
    id: 34,
    name: 'bmw',
  },
  {
    id: 35,
    name: 'byd',
  },
  {
    id: 36,
    name: 'buick',
  },
  {
    id: 37,
    name: 'bentley',
  },
  {
    id: 38,
    name: 'jaecoo',
  },
  {
    id: 39,
    name: 'gac',
  },
  {
    id: 40,
    name: 'gmc',
  },
  {
    id: 41,
    name: 'geo',
  },
  {
    id: 42,
    name: 'jiayuan',
  },
  {
    id: 43,
    name: 'jac',
  },
  {
    id: 44,
    name: 'geely',
  },
  {
    id: 45,
    name: 'jeep',
  },
  {
    id: 46,
    name: 'genesis',
  },
  {
    id: 47,
    name: 'great wall',
  },
  {
    id: 48,
    name: 'dacia',
  },
  {
    id: 49,
    name: 'dodge',
  },
  {
    id: 50,
    name: 'dongfeng',
  },
  {
    id: 51,
    name: 'ds',
  },
  {
    id: 52,
    name: 'daewoo',
  },
  {
    id: 53,
    name: 'daihatsu',
  },
  {
    id: 54,
    name: 'hummer',
  },
  {
    id: 55,
    name: 'hongqi',
  },
  {
    id: 56,
    name: 'honda',
  },
  {
    id: 57,
    name: 'hino',
  },
  {
    id: 58,
    name: 'wey',
  },
  {
    id: 59,
    name: 'voyah',
  },
  {
    id: 60,
    name: 'volvo',
  },
  {
    id: 61,
    name: 'tata',
  },
  {
    id: 62,
    name: 'toyota',
  },
  {
    id: 63,
    name: 'tesla',
  },
  {
    id: 64,
    name: 'jaguar',
  },
  {
    id: 65,
    name: 'hyundai',
  },
  {
    id: 66,
    name: 'lada',
  },
  {
    id: 67,
    name: 'lynk & co',
  },
  {
    id: 68,
    name: 'lincoln',
  },
  {
    id: 69,
    name: 'leapmotor',
  },
  {
    id: 70,
    name: 'lichi',
  },
  {
    id: 71,
    name: 'lamborghini',
  },
  {
    id: 72,
    name: 'land rover',
  },
  {
    id: 73,
    name: 'lancia',
  },
  {
    id: 74,
    name: 'lexus',
  },
  {
    id: 75,
    name: 'mazda',
  },
  {
    id: 76,
    name: 'man',
  },
  {
    id: 77,
    name: 'maserati',
  },
  {
    id: 78,
    name: 'mini',
  },
  {
    id: 79,
    name: 'mitsubishi',
  },
  {
    id: 80,
    name: 'mclaren',
  },
  {
    id: 81,
    name: 'maxus',
  },
  {
    id: 82,
    name: 'mercedes',
  },
  {
    id: 83,
    name: 'nio',
  },
  {
    id: 84,
    name: 'nissan',
  },
  {
    id: 85,
    name: 'nanjing',
  },
  {
    id: 86,
    name: 'saab',
  },
  {
    id: 87,
    name: 'sun living',
  },
  {
    id: 88,
    name: 'ssangyong',
  },
  {
    id: 89,
    name: 'sunshine',
  },
  {
    id: 90,
    name: 'subaru',
  },
  {
    id: 91,
    name: 'suzuki',
  },
  {
    id: 92,
    name: 'seat',
  },
  {
    id: 93,
    name: 'citroen',
  },
  {
    id: 94,
    name: 'smart',
  },
  {
    id: 95,
    name: 'cenntro',
  },
  {
    id: 96,
    name: 'skoda',
  },
  {
    id: 97,
    name: 'skywell',
  },
  {
    id: 98,
    name: 'seres',
  },
  {
    id: 99,
    name: 'polestar',
  },
  {
    id: 100,
    name: 'volkswagen',
  },
  {
    id: 101,
    name: 'pontiac',
  },
  {
    id: 102,
    name: 'ford',
  },
  {
    id: 103,
    name: 'porsche',
  },
  {
    id: 104,
    name: 'forthing',
  },
  {
    id: 105,
    name: 'piaggio',
  },
  {
    id: 106,
    name: 'fiat',
  },
  {
    id: 107,
    name: 'peugeot',
  },
  {
    id: 108,
    name: 'ferrari',
  },
  {
    id: 109,
    name: 'chery',
  },
  {
    id: 110,
    name: 'cadillac',
  },
  {
    id: 111,
    name: 'karma',
  },
  {
    id: 112,
    name: 'cupra',
  },
  {
    id: 113,
    name: 'kia',
  },
  {
    id: 114,
    name: 'chrysler',
  },
  {
    id: 115,
    name: 'rover',
  },
  {
    id: 116,
    name: 'rolls royce',
  },
  {
    id: 117,
    name: 'renault',
  },
  {
    id: 118,
    name: 'chevrolet',
  },
  {
    id: 119,
    name: 'infinity',
  },
  {
    id: 120,
    name: 'taar',
  },
]
const brandMapping = prepareBrandMapping(brandsData)
const models = prepareJsonData('car-models.json', brandMapping)
const sqlQuery = generateSqlQuery(models)
console.log(sqlQuery)

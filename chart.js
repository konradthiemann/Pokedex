let data = {
    labels: [
        'HP',
        'Attack',
        'Defense',
        'SP-Attack',
        'SP-Defense',
        'Speed',
    ],
    datasets: [{
        label: 'Base Stats',
        data: [65, 59, 90, 81, 56, 55,],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
};

async function createChart(id) {

    let singlePokemonUrl = (`${URL_API}` + `${id}`)
    let response = await fetch(singlePokemonUrl);
    let currentPokemon = await response.json();

    data['datasets'][0]['data'][0] = currentPokemon['stats'][0]['base_stat'];
    data['datasets'][0]['data'][1] = currentPokemon['stats'][1]['base_stat'];
    data['datasets'][0]['data'][2] = currentPokemon['stats'][2]['base_stat'];
    data['datasets'][0]['data'][3] = currentPokemon['stats'][3]['base_stat'];
    data['datasets'][0]['data'][4] = currentPokemon['stats'][4]['base_stat'];
    data['datasets'][0]['data'][5] = currentPokemon['stats'][5]['base_stat'];
    

    let ctx = document.getElementById('myChart'+id);

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            color: 'rgb(255,255,255)',
            scales: {
                r: {
                    angleLines: {
                        color: 'rgb(255,255,255)'
                    },
                    grid: {
                        color: 'rgb(255,255,255)'
                    },
                    pointLabels: {
                        color: 'rgb(255,255,255)'
                    },
                    ticks: {
                        color: 'rgb(255,255,255)',
                        backdropColor: 'rgba(0,0,0,0)'
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 3,
                    //  borderColor: 'rgb(255,255,255)'
                }
            }
        },
    }
    );

}

// HP, Attack, Defense, Sp-Attack, SP-Defense, Speed

// const config = {
//   type: 'radar',
//   data: data,
//   options: {
//     elements: {
//       line: {
//         borderWidth: 3
//       }
//     }
//   },
// };







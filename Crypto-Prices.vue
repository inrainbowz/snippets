<template>
<p>Coin Prices</p>

<table>
  <thead>
    <th v-for="title in titles" :key="title">
      {{ title }}
    </th>
  </thead>
  <tbody>
    <tr v-for="(coin, index) in coins" :key="coin.id">
      <td>{{ index + 1 }}</td>
      <td>
        <img :src="coin.image" alt="icon" style="width: 1.3rem" /> {{ coin.name }}
        <span class="symbol">{{ coin.symbol }}</span>
      </td>
      <td>${{ coin.current_price }}</td>
      <td :class="[(coin.price_change_24h).toFixed(3) > 0 ? 'green' : 'red']">${{ (coin.price_change_24h).toFixed(3) }}</td>
      <td :class="[(coin.price_change_percentage_24h).toFixed(3) > 0 ? 'green' : 'red']">{{ coin.price_change_percentage_24h }} %</td>
    </tr>
  </tbody>
</table>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      coins: [],
      titles: [
        '#',
        'Coins',
        'Price',
        '24h Change Value',
        'Change 24h percentage'
      ]
    }
  },
  async mounted() {
    const respone = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await respone.json()
    // console.log(data)
    this.coins = data
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
* {
  padding: 0;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
}

table {
  width: 100%;
}

th {
  font-weight: 400;
}

tr {
  border-collapse: collapse;
  border-spacing: 4rem;
}

.symbol {
  color: grey;
  text-transform: uppercase;
  margin-left: 10px;
}

.green {
  color: green;
}

.red {
  color: red;
}

</style>

<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(amount, idx) in amounts" :key="amount.amountId">
      <td>{{ idx + 1 }}</td>
      <td>{{ amount.amount }}</td>
      <td>{{ $date(amount.date) }} {{ $date(amount.date, 'time') }}</td>
      <td>{{ amount.title }}</td>
      <td>
        <span class="white-text badge" :class="[amount.typeColor]">{{ amount.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          v-tooltip="'Посмотреть запись'"
          @click="$router.push('/detail/' + amount.amountId)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    amounts: {
      required: true,
      type: Array,
    }
  },
}
</script>

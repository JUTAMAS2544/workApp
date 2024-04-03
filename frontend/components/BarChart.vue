<template>
  <Radar
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, Filler, BarElement, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, Filler, BarElement, CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, ArcElement )

interface Props {
  tc: number
  sp: number
  it: number
  ec: number
}
const prop = defineProps<Props>()

const chartData = computed(() => {
  return {
    labels: [
      'ระดับการประยุกต์ใช้ TC',
      'ระดับการประยุกต์ใช้ SP',
      'ระดับการประยุกต์ใช้ IT',
      'ระดับการประยุกต์ใช้ EC'
    ],
    datasets: [
      {
        data: [
          prop.tc,
          prop.sp,
          prop.it,
          prop.ec
        ],
        label: 'ระดับการประยุกต์ใช้เทคโนโลยีดิจิทัลเกษตรอาหาร',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
}

</script>
<template>
<div>
    <ion-list>
      <ion-item :key="item" v-for="item in skls">
        <div class="ion-padding custom-skeleton" >
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

<script>
import { 
  IonItem, 
  IonList, 
  IonSkeletonText,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'skeletonText',
  props: {
    size: {
      type: Number,
      default: 6
    }
  },
  setup(props){
    const skls = []

    for (let i = 0; i < props.size; i++) {
      skls.push(i)
    }

    return {
      skls
    }
  },
  components: {
    IonItem, 
    IonList, 
    IonSkeletonText,
  }
});
</script>

<style>
div {
    width: 100%;
}
  /* Custom Skeleton Line Height and Margin */
  .custom-skeleton ion-skeleton-text {
    line-height: 13px;
  }

  .custom-skeleton ion-skeleton-text:last-child {
    margin-bottom: 5px;
  }
</style>

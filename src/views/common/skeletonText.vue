<template>
<div>
    <ion-list>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
      <ion-item>
        <div class="ion-padding custom-skeleton">
            <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

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

<script>
import { 
  IonItem, 
  IonList, 
  IonSkeletonText,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'skeletonText',
  components: {
    IonItem, 
    IonList, 
    IonSkeletonText,
  }
});
</script>
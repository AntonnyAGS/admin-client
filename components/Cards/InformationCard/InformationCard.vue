<template>
  <div class="information-container">
    <v-card class="information-card">
      <v-carousel height="100%" :show-arrows="false" hide-delimiter-background>
        <v-carousel-item>
          <div class="information-card__item">
            <div class="information-card__title">
              Gerencie os projetos de sua universidade
            </div>
            <div class="information-card__body">
              <div class="information-card__grid">
                <div class="d-flex flex-column information-card__text">
                  <div class="information-card__description1">
                    Aqui dentro da <strong>Fábrica de Software</strong>, você pode gerenciar os projetos de extensão
                    da sua universidade. <br>
                    O software está em constante evolução e pretende trazer novas features em breve. Enquanto isso,
                    sinta se a vontade em comunicar os desenvolvedores caso algo estranho aconteça.
                  </div>
                  <v-spacer />
                  <v-btn class="information-card__button text-capitalize" rounded>
                    Conheça nos
                  </v-btn>
                </div>
                <div class="d-flex align-center justify-center information-card__image image-1" />
              </div>
            </div>
          </div>
        </v-carousel-item>
        <v-carousel-item height="100%">
          <div class="information-card__item">
            <div class="information-card__title">
              Edite, visualize e adicione novos alunos
            </div>
            <div class="information-card__body">
              <div class="information-card__grid">
                <div class="d-flex flex-column information-card__text">
                  <div>
                    Aqui dentro da <strong>Fábrica de Software</strong>, você pode gerenciar os alunos do seu projetos da sua universidade. <br>
                    O software está em constante evolução e pretende trazer novas features em breve. Enquanto isso,
                    sinta se a vontade em comunicar os desenvolvedores caso algo estranho aconteça.
                  </div>
                  <v-spacer />
                  <v-btn class="information-card__button text-capitalize" rounded>
                    Visualizar
                  </v-btn>
                </div>
                <div class="d-flex align-center justify-center information-card__image image-2" />
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.image-1 {
  background-image: url('../../../assets/images/idea.svg');
  background-size: contain;
  background-position: center;
}
.image-2 {
  background-image: url('../../../assets/images/brain.svg');
  background-size: contain;
  background-position: center;
}

.information-card {
  height: 100%;
  background-color: $MAIN_GREY !important;
  border-radius: $BORDER-RADIUS;
  &__item {
    color: black;
    padding: $MAIN_SPACE;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    grid-gap: $MAIN_SPACE * 2;
    padding: $MAIN_SPACE 0;
    height: 100%;
  }
  &__body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: ($MAIN_SPACE * 2) 0 ($MAIN_SPACE * 3) 0 ;
  }
  &__title {
    font-size: 1.8rem;
    font-weight: 600;
    font-family: Roboto;
  }
  &__button {
    width: 160px;
    margin-top: $MAIN_SPACE;
  }
  &__image {
    min-height: 160px;
  }
}
::v-deep .v-btn.v-btn--icon {
  color: $MAIN_ORANGE !important;
}

@media #{map-get($display-breakpoints, 'xl-only')}{
  .information-card {
    &__description1 {
    padding-bottom: 24px;
    }
  }
}

@media (max-width: 600px){
  .information-card {
    &__grid {
      grid-template-columns: 1fr;
      grid-template-areas: 'first-row'
      'second-row';
    }
    &__text {
      grid-area: second-row;
    }
    &__button {
      width: auto;
      margin-top: $MAIN_SPACE;
    }
  }
}
</style>

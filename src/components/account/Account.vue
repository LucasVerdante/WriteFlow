<template>
  <section class="section">
    <div class="container">

      <div class="columns">
        <div class="column is-3">

          <!-- Account left rail menu -->
          <aside class="menu">
            <p class="menu-label">
              My Account
            </p>

            <ul class="menu-list">
              <li><router-link to="/my-account/billing">Billing</router-link></li>
            </ul>
          </aside>
        </div>

        <div class="column is-8 is-offset-1">
          <router-view></router-view>
        </div>

      </div><!-- /columns -->
    </div>
  </section>
</template>

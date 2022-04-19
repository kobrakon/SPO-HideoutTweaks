const database = DatabaseServer.tables
const hideout = database.hideout
const products = hideout.production
const globals = database.globals.config
const locales = database.locales.global
let product;

class hideouttweaks
{
  constructor ()
  {
    this.mod = ModLoader.basePath["Kobrakon-HideoutTweaks"]
    ModLoader.onModLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.Assign({"Interceptor": hideouttweaks.begin}, HttpRouter.onStaticRoute["/client/game/start"])
    HttpRouter.onStaticRoute["/client/game/start"] = hideouttweaks.begin(url, info, sessionID)
  }
  
  load()
  {
    locales.en.interface["hideout_HydrationRegeneration"] = "Total max hydration"
    locales.en.interface["hideout_HealthRegeneration"] = "Total max stamina"
    locales.en.interface["hideout_EnergyRegeneration"] = "Total max energy"
    locales.en.interface["hideout_MaximumEnergyReserve"] = "Total Hydration and Energy reserve"
    
    for (product in products)
    {
      if (products[product].areaType == 20)
      {
        products[product].productionTime = 72000
      }
      
      if (products[product].areaType == 19)
      {
        products[product].productionTime = 7200
      }
      
      if (products[product].areaType == 6)
      {
        products[product].productionTime = 10800
      }
    }
  }
  
  static begin(url, info, sessionID)
  {
    setInterval(hideouttweaks.getPlayerData, 1000, sessionID)
  }
  
  static getPlayerData(sessionID)
  {
    let pmcData = ProfileController.getPmcProfile(sessionID)
    
    globals.Regeneration.Energy = 0 // enforce no regen
    globals.Regeneration.Hydration = 0
    for (let value in globals.Regeneration.BodyHealth)
    {
      globals.Regeneration.BodyHealth.Value = 0
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `+5 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum += 5
    }
    
    if (pmcData.Hideout.Areas[7].level == 2)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `+5 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum += 5
    }
    
    if (pmcData.Hideout.Areas[7].level == 3)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `+15 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum += 15
    }
    
    if(pmcData.Hideout.Areas[8].level == 1)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `+20 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 20
    }
    
    if(pmcData.Hideout.Areas[8].level == 2)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `+40 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 20
    }
    
    if(pmcData.Hideout.Areas[8].level == 31)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `+50 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 10
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `+5 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum += 5
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `+5 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum += 5
    }
    
    if (pmcData.Hideout.Areas[7].level == 1)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `+15 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum += 5
    }
    
    if (pmcData.Hideout.Areas[10].Level == 3)
    {
      pmcData.Health.Hydration.Maximum += 10
    }
  }
}

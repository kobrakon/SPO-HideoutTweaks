const database = DatabaseServer.tables
const hideout = database.hideout
const products = hideout.production
const globals = database.globals.config
const locales = database.locales.global
let product;
let check1 = false // have to add a bunch of checks if I want the maths to work properly because if I don't then the fact its an interval means it will keep adding endlessly
let check2 = false
let check3 = false
let check4 = false
let check5 = false
let check6 = false
let check7 = false
let check8 = false
let check9 = false
let check10 = false

class hideouttweaks
{
  constructor ()
  {
    this.mod = ModLoader.getModPath("Kobrakon-HideoutTweaks")
    ModLoader.onLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": hideouttweaks.begin}, HttpRouter.onStaticRoute["/client/game/start"]) // needed in order to catch pmc data 
    HttpRouter.onStaticRoute["/client/game/start"]["Interceptor"] = hideouttweaks.begin // checks your profile and applys changes (when conditions are met) every half-second
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
  
  static begin(url, info, sessionID, output)
  {
    setInterval(hideouttweaks.getPlayerData, 1000, sessionID)

    return(output)
  }
  
  static getPlayerData(sessionID)
  {
    let pmcData = ProfileController.getPmcProfile(sessionID)
    
    globals.Health.Effects.Regeneration.Energy = 0 // enforce no regen
    globals.Health.Effects.Regeneration.Hydration = 0
    for (let value in globals.Health.Effects.Regeneration.BodyHealth)
    {
      globals.Health.Effects.Regeneration.BodyHealth[value].Value = 0
    }
    
    if (pmcData.Hideout.Areas[7].level == 1 && !check1)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `+5 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum +=5
      check1 = true
    }
    
    if (pmcData.Hideout.Areas[7].level == 2 && !check2)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `10 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum += 5
      check2 = true
    }
    
    if (pmcData.Hideout.Areas[7].level == 3 && !check3)
    {
      locales.en.interface["{0} wp/hr ({1} wp/hr in total)"] = `15 WP (${pmcData.Health.Hydration.Maximum} total)`
      pmcData.Health.Hydration.Maximum += 5
      check3 = true
    }
    
    if(pmcData.Hideout.Areas[8].level == 1 && !check4)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `10 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 10
      check4 = true
    }
    
    if(pmcData.Hideout.Areas[8].level == 2 && !check5)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `15 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 5
      check5 = true
    }
    
    if(pmcData.Hideout.Areas[8].level == 3 && !check6)
    {
      locales.en.interface["{0} hp/hr ({1} hp/hr in total)"] = `20 SP (${globals.Stamina.Capacity} total)`
      globals.Stamina.Capacity += 5
      check6 = true
    }
    
    if (pmcData.Hideout.Areas[7].level == 1 && !check7)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `5 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum +=5
      check7 = true
    }
    
    if (pmcData.Hideout.Areas[7].level == 2 && !check8)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `10 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum += 5
      check8 = true
    }
    
    if (pmcData.Hideout.Areas[7].level == 3 && !check9)
    {
      locales.en.interface["{0} ep/hr ({1} ep/hr in total)"] = `15 EP (${pmcData.Health.Energy.Maximum} total)`
      pmcData.Health.Energy.Maximum += 5
      check9 = true
    }
    
    if (pmcData.Hideout.Areas[20].level == 3 && !check10)
    {
      pmcData.Health.Hydradtion.Maximum += 10
      check10 = true
    }
  }
}

module.exports.Mod = hideouttweaks

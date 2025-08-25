import { useState, useEffect } from 'react';
import { Calculator, Clock, PoundSterling, Users, Info } from 'lucide-react';

const NurseryFeeCalculator = () => {
  const [childAge, setChildAge] = useState('9months-4years');
  const [userAge, setUserAge] = useState('21-over');
  const [meetsIncomeThreshold, setMeetsIncomeThreshold] = useState(true);
  const [hasHighEarner, setHasHighEarner] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [hoursPerDay, setHoursPerDay] = useState(10.5);
  const [dailyCharge, setDailyCharge] = useState(65.00);
  const [dailyConsumables, setDailyConsumables] = useState(5.00);
  const [isFullYear, setIsFullYear] = useState(true); // true = 52 weeks, false = 38 weeks (term-time)
  const [hasTaxFreeAccount, setHasTaxFreeAccount] = useState(true);
  
  const [results, setResults] = useState({
    totalWeeklyCost: 0,
    totalChildcareWeeklyCost: 0,
    weeklyConsumablesCost: 0,
    freeHours: 0,
    freeDaysPerWeek: 0,
    chargableDaysPerWeek: 0,
    weeklyAfterFreeHours: 0,
    taxFreeContribution: 0,
    finalWeeklyCost: 0,
    monthlyAfterSupport: 0,
    annualAfterSupport: 0,
    hoursPerWeek: 0,
    weeksPerYear: 52,
    monthlyFeesBeforeTaxFree: 0,
    isWithinTaxFreeLimit: true,
    daysPerWeek: 5
  });

  // Calculate free hours based on age and pre-qualification
  const calculateFreeHours = () => {
    if (childAge === '9months-4years' && meetsIncomeThreshold && !hasHighEarner) {
      return 30; // 30 hours for 9 months to 4 years if income qualified and no high earner
    }
    return 0; // No free hours if under 9 months, not income qualified, or has high earner
  };

  // Handle day selection toggle
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  // Get income threshold based on user age
  const getIncomeThreshold = () => {
    switch(userAge) {
      case 'under-18-apprentice': return '£1,570 (£6,280 annually)';
      case '18-20': return '£2,080 (£8,320 annually)';
      case '21-over': return '£2,539 (£10,156 annually)';
      default: return '£2,539 (£10,156 annually)';
    }
  };

  useEffect(() => {
    const daysPerWeek = selectedDays.length;
    const hoursPerWeek = daysPerWeek * hoursPerDay;
    const weeksPerYear = isFullYear ? 52 : 38;
    const freeHours = calculateFreeHours();
    
    // Free hours are always term-time (38 weeks) but can be stretched over full year
    const freeHoursPerWeek = isFullYear && freeHours > 0 ? (freeHours * 38) / 52 : freeHours;
    
    // Convert free hours to equivalent free days (based on hours per day)
    const freeDaysPerWeek = freeHoursPerWeek / hoursPerDay;
    const chargableDaysPerWeek = Math.max(0, daysPerWeek - freeDaysPerWeek);
    
    // Childcare costs (eligible for government support)
    const totalChildcareWeeklyCost = daysPerWeek * dailyCharge;
    const childcareAfterFreeHours = chargableDaysPerWeek * dailyCharge;
    
    // Consumables costs (not eligible for government support)
    const weeklyConsumablesCost = daysPerWeek * dailyConsumables;
    
    // Combined total before any support
    const totalWeeklyCost = totalChildcareWeeklyCost + weeklyConsumablesCost;
    
    // Tax-free childcare: 20% government contribution, max £2000/year per child
    // Only applies to childcare fees, NOT consumables
    const maxAnnualTaxFree = 2000;
    const maxWeeklyTaxFree = maxAnnualTaxFree / weeksPerYear;
    const potentialTaxFreeContribution = childcareAfterFreeHours * 0.2;
    const actualTaxFreeContribution = hasTaxFreeAccount ? 
      Math.min(potentialTaxFreeContribution, maxWeeklyTaxFree) : 0;
    
    // Final costs
    const childcareAfterAllSupport = childcareAfterFreeHours - actualTaxFreeContribution;
    const finalWeeklyCost = childcareAfterAllSupport + weeklyConsumablesCost;
    const monthlyAfterSupport = finalWeeklyCost * (weeksPerYear / 12);
    const annualAfterSupport = finalWeeklyCost * weeksPerYear;

    // Check Tax-Free Childcare quarterly limit (only applies to childcare fees)
    const monthlyChildcareBeforeTaxFree = childcareAfterFreeHours * (weeksPerYear / 12);
    const maxMonthlyEligibleSpend = 2500 / 3; // £500 government contribution per quarter / 3 months
    const isWithinTaxFreeLimit = monthlyChildcareBeforeTaxFree <= maxMonthlyEligibleSpend;

    setResults({
      totalWeeklyCost,
      totalChildcareWeeklyCost,
      weeklyConsumablesCost,
      freeHours: freeHoursPerWeek,
      freeDaysPerWeek: freeDaysPerWeek,
      chargableDaysPerWeek: chargableDaysPerWeek,
      weeklyAfterFreeHours: childcareAfterFreeHours,
      taxFreeContribution: actualTaxFreeContribution,
      finalWeeklyCost,
      monthlyAfterSupport,
      annualAfterSupport,
      hoursPerWeek,
      weeksPerYear,
      monthlyFeesBeforeTaxFree: monthlyChildcareBeforeTaxFree,
      isWithinTaxFreeLimit,
      daysPerWeek
    });
  }, [childAge, userAge, meetsIncomeThreshold, hasHighEarner, selectedDays, hoursPerDay, dailyCharge, dailyConsumables, hasTaxFreeAccount, isFullYear]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">UK Nursery Fee Calculator</h1>
              <p className="text-blue-100 mt-1">Calculate your childcare costs with government support</p>
            </div>
          </div>
        </div>

{/* Advertisement Banner */}
<div className="mx-6 mt-6 mb-2">
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
    <p className="text-xs text-gray-500 mb-2">Advertisement</p>
    <div id="awin-ad-banner" className="min-h-[100px] flex items-center justify-center bg-white rounded">
      {/* AWIN Advertisement */}
      <a 
        rel="sponsored" 
        href="https://www.awin1.com/cread.php?s=3542947&v=70252&q=480771&r=2532679"
        className="block"
      >
        <img 
          src="https://www.awin1.com/cshow.php?s=3542947&v=70252&q=480771&r=2532679" 
          alt="Frutteto Italia fruit spread"
          className="max-w-full h-auto"
          style={{ border: 0 }}
        />
      </a>
    </div>
  </div>
</div>

        <div className="p-6 space-y-8">
          {/* Pre-qualification Section */}
          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Free Childcare Hours Pre-Qualification
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Q1: What age are you?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="userAge"
                        checked={userAge === 'under-18-apprentice'}
                        onChange={() => setUserAge('under-18-apprentice')}
                        className="sr-only"
                      />
                      <div className={`text-lg ${userAge === 'under-18-apprentice' ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">Under 18 or Apprentice</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="userAge"
                        checked={userAge === '18-20'}
                        onChange={() => setUserAge('18-20')}
                        className="sr-only"
                      />
                      <div className={`text-lg ${userAge === '18-20' ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">18-20 years old</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="userAge"
                        checked={userAge === '21-over'}
                        onChange={() => setUserAge('21-over')}
                        className="sr-only"
                      />
                      <div className={`text-lg ${userAge === '21-over' ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">21 and over</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Q2: Will you and your partner (if you have one) each earn more than {getIncomeThreshold()} in the next 3 months?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="income"
                        checked={meetsIncomeThreshold}
                        onChange={() => setMeetsIncomeThreshold(true)}
                        className="sr-only"
                      />
                      <div className={`text-lg ${meetsIncomeThreshold ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">Yes, we meet the income threshold</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="income"
                        checked={!meetsIncomeThreshold}
                        onChange={() => setMeetsIncomeThreshold(false)}
                        className="sr-only"
                      />
                      <div className={`text-lg ${!meetsIncomeThreshold ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">No, we don't meet the income threshold</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Q3: Do either you or your partner (if you have one) earn more than £100,000 per annum?
                  </label>
                  <div className="grid md:grid-cols-2 gap-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="highEarner"
                        checked={hasHighEarner}
                        onChange={() => setHasHighEarner(true)}
                        className="sr-only"
                      />
                      <div className={`text-lg ${hasHighEarner ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">Yes, one of us earns over £100k</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="highEarner"
                        checked={!hasHighEarner}
                        onChange={() => setHasHighEarner(false)}
                        className="sr-only"
                      />
                      <div className={`text-lg ${!hasHighEarner ? 'opacity-100' : 'opacity-30'}`}>
                        🍼
                      </div>
                      <span className="text-sm">No, neither of us earns over £100k</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Qualification Status */}
              <div className="mt-4 p-4 rounded-lg border">
                {childAge === '9months-4years' && meetsIncomeThreshold && !hasHighEarner ? (
                  <div className="bg-green-50 border-green-200 text-green-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Great! You qualify for 30 free hours per week</span>
                  </div>
                ) : childAge === '9months-4years' && !meetsIncomeThreshold ? (
                  <div className="bg-amber-50 border-amber-200 text-amber-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="font-medium">You don't qualify for the 30 free hours due to income threshold</span>
                  </div>
                ) : childAge === '9months-4years' && hasHighEarner ? (
                  <div className="bg-red-50 border-red-200 text-red-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium">You don't qualify for the 30 free hours due to high earner (£100k+)</span>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-gray-200 text-gray-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="font-medium">Children 0-8 months don't qualify for free hours</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Child & Family Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Child's Age</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="childAge"
                      checked={childAge === '0-8months'}
                      onChange={() => setChildAge('0-8months')}
                      className="sr-only"
                    />
                    <div className={`text-2xl ${childAge === '0-8months' ? 'opacity-100' : 'opacity-30'}`}>
                      👶
                    </div>
                    <span className="text-sm">0-8 months</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="childAge"
                      checked={childAge === '9months-4years'}
                      onChange={() => setChildAge('9months-4years')}
                      className="sr-only"
                    />
                    <div className={`text-2xl ${childAge === '9months-4years' ? 'opacity-100' : 'opacity-30'}`}>
                      🧒
                    </div>
                    <span className="text-sm">9 months - 4 years</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Days per week in nursery
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedDays.includes(day)
                          ? 'bg-blue-500 text-white border-2 border-blue-500'
                          : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Click on the days your child attends nursery ({selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''} selected)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours per day
                </label>
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Math.max(0, parseFloat(e.target.value) || 0))}
                  min="0"
                  max="12"
                  step="0.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use nursery-stipulated session times (e.g., 8am-6pm = 10 hours), not your personal drop-off/collection times
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendance pattern</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="attendance"
                      checked={isFullYear}
                      onChange={() => setIsFullYear(true)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Full-time (52 weeks/year)</span>
                      <p className="text-xs text-gray-600">Attending year-round including holidays</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="attendance"
                      checked={!isFullYear}
                      onChange={() => setIsFullYear(false)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Term-time only (38 weeks/year)</span>
                      <p className="text-xs text-gray-600">Following school terms with holidays off</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <PoundSterling className="inline w-4 h-4 mr-1" />
                    Daily charge
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">£</span>
                    <input
                      type="number"
                      value={dailyCharge}
                      onChange={(e) => setDailyCharge(Math.max(0, Math.min(150, parseFloat(e.target.value) || 0)))}
                      min="0"
                      max="150"
                      step="0.50"
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    value={dailyCharge}
                    onChange={(e) => setDailyCharge(parseFloat(e.target.value))}
                    min="0"
                    max="150"
                    step="0.50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(dailyCharge/150)*100}%, #e5e7eb ${(dailyCharge/150)*100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>£0</span>
                  <span>£150</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <PoundSterling className="inline w-4 h-4 mr-1" />
                    Daily consumables
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">£</span>
                    <input
                      type="number"
                      value={dailyConsumables}
                      onChange={(e) => setDailyConsumables(Math.max(0, Math.min(25, parseFloat(e.target.value) || 0)))}
                      min="0"
                      max="25"
                      step="0.25"
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    value={dailyConsumables}
                    onChange={(e) => setDailyConsumables(parseFloat(e.target.value))}
                    min="0"
                    max="25"
                    step="0.25"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(dailyConsumables/25)*100}%, #e5e7eb ${(dailyConsumables/25)*100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>£0</span>
                  <span>£25</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Cost of nappies, wipes, food, etc. (not eligible for government support)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasTaxFreeAccount}
                    onChange={(e) => setHasTaxFreeAccount(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Using Tax-Free Childcare account (20% government contribution)
                  </span>
                </label>
                
                {/* Tax-Free Childcare Limit Check */}
                {results.monthlyFeesBeforeTaxFree > 0 && (
                  <div className="mt-3">
                    {results.isWithinTaxFreeLimit ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Great! You are within the Tax-Free Childcare allowance</span>
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          Monthly fees: £{results.monthlyFeesBeforeTaxFree.toFixed(2)} (Quarterly limit: £833.33)
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="font-medium">Your monthly fees exceed the Tax-Free Childcare quarterly limit</span>
                        </div>
                        <div className="text-sm text-amber-700 mt-1">
                          Monthly fees: £{results.monthlyFeesBeforeTaxFree.toFixed(2)} (Quarterly limit: £833.33)
                        </div>
                        <div className="text-sm text-amber-700 mt-1">
                          You'll receive the maximum £500 government contribution per quarter.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

{/* Advertisement Banner */}
<div className="mx-6 mt-6 mb-2">
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
    <p className="text-xs text-gray-500 mb-2">Advertisement</p>
    <div id="awin-ad-banner" className="min-h-[100px] flex items-center justify-center bg-white rounded">
      {/* START ADVERTISER: Frutteto Italia fruit spread from awin.com */}
      <a 
        rel="sponsored" 
        href="https://www.awin1.com/cread.php?s=3870741&v=112284&q=513045&r=2532679"
        className="block"
      >
        <img 
          src="https://www.awin1.com/cshow.php?s=3870741&v=112284&q=513045&r=2532679" 
          alt="Frutteto Italia fruit spread"
          className="max-w-full h-auto"
          style={{ border: 0 }}
        />
      </a>
      {/* END ADVERTISER: Frutteto Italia fruit spread from awin.com */}
    </div>
  </div>
</div>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Cost Breakdown</h2>

            <div className="space-y-4">
              <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-blue-700 font-medium">Hours per week</div>
                    <div className="text-blue-900 font-bold">{results.hoursPerWeek}</div>
                  </div>
                  <div>
                    <div className="text-blue-700 font-medium">Weeks per year</div>
                    <div className="text-blue-900 font-bold">{results.weeksPerYear}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Childcare cost (no support)</span>
                  <span className="font-semibold">£{results.totalChildcareWeeklyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Consumables cost</span>
                  <span className="font-semibold">£{results.weeklyConsumablesCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Total weekly cost (no support)</span>
                    <span className="font-bold">£{results.totalWeeklyCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {results.daysPerWeek} days × £{dailyCharge.toFixed(2)}/day + {results.daysPerWeek} days × £{dailyConsumables.toFixed(2)}/day consumables ({results.hoursPerWeek} hours/week)
                </div>
              </div>

              {results.freeHours > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-700">Free hours per week</span>
                    <span className="font-semibold text-green-700">{results.freeHours.toFixed(1)} hours</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-700">Equivalent free days per week</span>
                    <span className="font-semibold text-green-700">{results.freeDaysPerWeek.toFixed(1)} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600">Weekly saving</span>
                    <span className="font-semibold text-green-600">
                      -£{(results.freeDaysPerWeek * dailyCharge).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-700">Chargeable days per week</span>
                  <span className="font-semibold text-blue-700">{results.chargableDaysPerWeek.toFixed(1)} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600">Nursery fees after free hours</span>
                  <span className="font-semibold text-blue-600">£{results.weeklyAfterFreeHours.toFixed(2)}</span>
                </div>
              </div>

              {hasTaxFreeAccount && results.taxFreeContribution > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Tax-free childcare contribution</span>
                    <span className="font-semibold text-purple-700">
                      -£{results.taxFreeContribution.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    20% government contribution (max £{(2000 / results.weeksPerYear).toFixed(2)}/week)
                  </div>
                </div>
              )}

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-orange-700">Consumables (no government support)</span>
                  <span className="font-semibold text-orange-700">+£{results.weeklyConsumablesCost.toFixed(2)}</span>
                </div>
                <div className="text-sm text-orange-600 mt-1">
                  Nappies, wipes, food, etc. - not eligible for free hours or tax-free childcare
                </div>
              </div>

{/* Advertisement Banner */}
<div className="mx-6 mt-6 mb-2">
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
    <p className="text-xs text-gray-500 mb-2">Advertisement</p>
    <div id="awin-ad-banner" className="min-h-[100px] flex items-center justify-center bg-white rounded">
      {/* START ADVERTISER: Liomen: Prime Skincare from awin.com */}
      <a 
        rel="sponsored" 
        href="https://www.awin1.com/cread.php?s=2982965&v=1992&q=396725&r=2532679"
        className="block"
      >
        <img 
          src="https://www.awin1.com/cshow.php?s=2982965&v=1992&q=396725&r=2532679" 
          alt="Liomen: Prime Skincare"
          className="max-w-full h-auto"
          style={{ border: 0 }}
        />
      </a>
      {/* END ADVERTISER: Liomen: Prime Skincare from awin.com */}
    </div>
  </div>
</div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-lg text-white">
                <div className="text-lg font-bold mb-4 text-center">My Childcare Costs</div>
                
                {/* Cost Breakdown Table */}
                <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-300">
                        <th className="text-left py-2 text-indigo-100">Cost Type</th>
                        <th className="text-right py-2 text-indigo-100">Weekly</th>
                        <th className="text-right py-2 text-indigo-100">Monthly</th>
                        <th className="text-right py-2 text-indigo-100">Annual</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="py-1">Standard Nursery Costs</td>
                        <td className="text-right py-1 font-semibold">£{results.totalChildcareWeeklyCost.toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.totalChildcareWeeklyCost * (results.weeksPerYear / 12)).toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.totalChildcareWeeklyCost * results.weeksPerYear).toFixed(0)}</td>
                      </tr>
                      
                      {results.freeHours > 0 && (
                        <tr>
                          <td className="py-1">Free Childcare - 30 Hours</td>
                          <td className="text-right py-1 font-semibold">-£{(results.freeDaysPerWeek * dailyCharge).toFixed(0)}</td>
                          <td className="text-right py-1 font-semibold">-£{(results.freeDaysPerWeek * dailyCharge * (results.weeksPerYear / 12)).toFixed(0)}</td>
                          <td className="text-right py-1 font-semibold">-£{(results.freeDaysPerWeek * dailyCharge * results.weeksPerYear).toFixed(0)}</td>
                        </tr>
                      )}
                      
                      <tr>
                        <td className="py-1">Nursery Costs with Free Childcare applied</td>
                        <td className="text-right py-1 font-semibold">£{results.weeklyAfterFreeHours.toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.weeklyAfterFreeHours * (results.weeksPerYear / 12)).toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.weeklyAfterFreeHours * results.weeksPerYear).toFixed(0)}</td>
                      </tr>
                      
                      {hasTaxFreeAccount && results.taxFreeContribution > 0 && (
                        <>
                          <tr>
                            <td className="py-1">Tax-Free Childcare Saving</td>
                            <td className="text-right py-1 font-semibold">-£{results.taxFreeContribution.toFixed(0)}</td>
                            <td className="text-right py-1 font-semibold">-£{(results.taxFreeContribution * (results.weeksPerYear / 12)).toFixed(0)}</td>
                            <td className="text-right py-1 font-semibold">-£{(results.taxFreeContribution * results.weeksPerYear).toFixed(0)}</td>
                          </tr>
                          <tr>
                            <td className="py-1">Your New Nursery Costs </td>
                            <td className="text-right py-1 font-semibold">£{(results.weeklyAfterFreeHours - results.taxFreeContribution).toFixed(0)}</td>
                            <td className="text-right py-1 font-semibold">£{((results.weeklyAfterFreeHours - results.taxFreeContribution) * (results.weeksPerYear / 12)).toFixed(0)}</td>
                            <td className="text-right py-1 font-semibold">£{((results.weeklyAfterFreeHours - results.taxFreeContribution) * results.weeksPerYear).toFixed(0)}</td>
                          </tr>
                        </>
                      )}
                      
                      <tr>
                        <td className="py-1">Consumables</td>
                        <td className="text-right py-1 font-semibold">£{results.weeklyConsumablesCost.toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.weeklyConsumablesCost * (results.weeksPerYear / 12)).toFixed(0)}</td>
                        <td className="text-right py-1 font-semibold">£{(results.weeklyConsumablesCost * results.weeksPerYear).toFixed(0)}</td>
                      </tr>
                      
                      <tr className="border-t border-indigo-300">
                        <td className="py-2 font-bold text-base">Total</td>
                        <td className="text-right py-2 font-bold text-base">£{results.finalWeeklyCost.toFixed(0)}</td>
                        <td className="text-right py-2 font-bold text-base">£{results.monthlyAfterSupport.toFixed(0)}</td>
                        <td className="text-right py-2 font-bold text-base">£{results.annualAfterSupport.toFixed(0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Savings Summary */}
              {(results.freeHours > 0 || hasTaxFreeAccount) && (
                <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                  <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                    <Info className="w-4 h-4" />
                    Total Government Support (Childcare Only)
                  </div>
                  <div className="space-y-1 text-sm text-green-700">
                    {results.freeHours > 0 && (
                      <div>Free hours: £{(results.freeDaysPerWeek * dailyCharge * results.weeksPerYear).toFixed(2)}/year</div>
                    )}
                    {hasTaxFreeAccount && (
                      <div>Tax-free childcare: £{(results.taxFreeContribution * results.weeksPerYear).toFixed(2)}/year</div>
                    )}
                    <div className="font-semibold border-t border-green-300 pt-1">
                      Total childcare savings: £{((results.totalChildcareWeeklyCost - (results.weeklyAfterFreeHours - results.taxFreeContribution)) * results.weeksPerYear).toFixed(2)}/year
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Note: Government support only applies to childcare fees, not consumables
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Important Notes:</h3>
          <ul className="space-y-1">
            <li>• <strong>Disclaimer:</strong> This calculator is for educational and guideline purposes only. It does not constitute financial advice. Always verify costs and eligibility with your nursery and relevant government agencies.</li>
            <li>• 30 free hours are available for children 9 months - 4 years whose parents meet income thresholds</li>
            <li>• Income thresholds: Under 18/Apprentice (£1,570), 18-20 (£2,080), 21+ (£2,539) per person over 3 months</li>
            <li>• Families are disqualified if either parent earns over £100,000 per annum</li>
            <li>• Consumables (nappies, wipes, food, etc.) are not eligible for free hours or tax-free childcare support</li>
            <li>• Free hours funding is term-time based (38 weeks) but can be "stretched" across 52 weeks if attending full-time</li>
            <li>• Use nursery-stipulated session times (e.g., 7.30am until 6pm = 10.5 hours), not your personal drop-off/collection times</li>
            <li>• Daily charges should reflect the full hours for which your child can attend nursery, regardless as to whether you maximise these hours. For example, if you choose the full day rate of 7.30am until 6pm, but drop your child off at 8am and collect at 5.30pm, the nursery will still charge you for the full day hours.</li>
            <li>• Tax-Free Childcare: You pay £8, government adds £2 (max £2000/year per child)</li>
            <li>• You cannot use both Tax-Free Childcare and Child Tax Credit/Universal Credit childcare support</li>
            <li>• Rates and eligibility criteria may change - always check gov.uk for latest information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NurseryFeeCalculator;
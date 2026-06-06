import { Check } from 'lucide-react';

function Pricing() {
  const plans = [
    { name: 'Starter', price: '$0', credits: '100', features: ['Basic access', 'Community support', 'Monthly updates'] },
    { name: 'Pro', price: '$29', credits: '2,000', features: ['All Starter features', 'Priority support', 'API access', 'Advanced analytics'], featured: true },
    { name: 'Enterprise', price: '$99', credits: '10,000', features: ['All Pro features', 'Custom domain', 'Dedicated manager', 'Team collaboration'] },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your plan</h1>
        <p className="text-gray-500">Scale your credit usage with the perfect plan for your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`rounded-3xl p-8 border ${plan.featured ? 'border-blue-600 bg-blue-50/50 shadow-xl' : 'border-gray-200 bg-white shadow-sm'}`}
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{plan.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>
            <p className="mt-2 text-blue-600 font-semibold">{plan.credits} Credits</p>
            
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                  <Check size={18} className="text-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Pricing;
import React from 'react'

const Features = () => {

    const issues = [
    "Garbage Overflow",
    "Potholes",
    "Streetlight Not Working",
    "Water Leakage",
    "Open Drainage",
  ];



  return (
    <section id="features" className="px-8 py-16 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-12">
        What You Can Report
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition text-center font-semibold"
          >
            {issue}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
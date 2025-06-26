import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ClinicManagement() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    service: "",
    cost: "",
    nextVisit: "",
  });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleAddPatient = () => {
    if (!form.name || !form.service || !form.cost) {
      alert("Please fill in all required fields (Name, Service, Cost).");
      return;
    }

    const newPatient = {
      name: form.name,
      service: form.service,
      cost: parseFloat(form.cost),
      nextVisit: form.nextVisit,
    };

    setPatients((prev) => [...prev, newPatient]);
    setForm({ name: "", service: "", cost: "", nextVisit: "" });
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white py-12 px-6 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <Card className="p-10 shadow-2xl border border-gray-100 bg-white rounded-3xl">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-8">🩺 Add Patient Record</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              placeholder="Patient Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              placeholder="Cost (PHP)"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              type="number"
              className="rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <Textarea
              placeholder="Service Provided"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="rounded-2xl shadow-sm md:col-span-2 focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              name="nextVisit"
              value={form.nextVisit}
              onChange={handleChange}
              type="date"
              className="rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="mt-8 text-right">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg rounded-2xl shadow-md transition duration-200"
              onClick={handleAddPatient}
            >
              ➕ Add Patient
            </Button>
          </div>
        </Card>

        <div className="space-y-8">
          <h2 className="text-4xl font-extrabold text-indigo-900">📋 Patient Records</h2>
          <Input
            placeholder="🔍 Search by name or service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          {filteredPatients.length === 0 ? (
            <p className="text-gray-500 italic">No matching patient records found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPatients.map((patient, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="space-y-3">
                    <p><span className="font-semibold text-indigo-700">👤 Name:</span> {patient.name}</p>
                    <p><span className="font-semibold text-indigo-700">📝 Service:</span> {patient.service}</p>
                    <p><span className="font-semibold text-indigo-700">💰 Cost:</span> ₱{patient.cost}</p>
                    {patient.nextVisit && (
                      <p><span className="font-semibold text-indigo-700">📅 Next Visit:</span> {patient.nextVisit}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
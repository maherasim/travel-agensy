<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():Response
    {
        // Render the index view with the form for creating a new service request
        return Inertia::render('Client/ServiceForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 
    public function preview(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'service_type' => 'required',
            'passenger_number' => 'nullable|integer',
            'price' => 'nullable|integer',
            'passenger_names' => 'nullable|array',
            'domestic_international' => 'nullable|string',
            'oneway_roundway' => 'nullable|string',
            'from_location' => 'nullable|string',
            'to_location' => 'nullable|string',
            'departure_date' => 'nullable|date',
            'airline_name' => 'nullable|string',
        ]);
    
        // Pass the validated data to the preview view
        return view('services.preview', compact('validatedData'));
    }
    

     public function store(Request $request)
     {
         // Validate the incoming request data
         $validatedData = $request->validate([
             'service_type' => 'required',
             'passenger_number' => 'nullable|integer',
             'price' => 'required|integer',
             'passenger_names' => 'nullable|array',
             'domestic_international' => 'nullable|string',
             'oneway_roundway' => 'nullable|string',
             'from_location' => 'nullable|string',
             'to_location' => 'nullable|string',
             'departure_date' => 'nullable|date',
             'airline_name' => 'nullable|string',
         ]);
       
     
         // Convert passenger names array to a comma-separated string
         $passengerNamesString = !empty($validatedData['passenger_names']) ? implode(',', $validatedData['passenger_names']) : null;
     
         // Create a new service request instance with the validated data
         $serviceRequest = ServiceRequest::create([
             'client_id' => Auth::id(),
             'service_type' => $validatedData['service_type'],
             'passenger_number' => $validatedData['passenger_number'],
             'price' => $validatedData['price'],
             'passenger_name' => $passengerNamesString, // Save passenger names as a string
             'domestic_international' => $validatedData['domestic_international'],
             'oneway_roundway' => $validatedData['oneway_roundway'],
             'from_location' => $validatedData['from_location'],
             'to_location' => $validatedData['to_location'],
             'departure_date' => $validatedData['departure_date'],
             'airline_name' => $validatedData['airline_name'],
         ]);
     
         // Return a success response or redirect to the index page
         return redirect()->route('services.index')->with('success', 'Service request created successfully.');
     }
     


    
    
    
    public function fetch(Request $request)
    {        
        $service = ServiceRequest::all();
          return response()->json(['data'=>$service],200);
     }

  

}
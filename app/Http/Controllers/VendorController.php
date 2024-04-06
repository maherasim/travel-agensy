<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use App\Models\Vendor; 
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class VendorController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Vendor/VendorForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'trade_name' => 'required',
            'vendor_type' => 'required',
            'address' => 'required',
            'email' => 'required|email', // Add unique rule for email
            'phone_number' => 'required|string', // Add unique rule for phone number
            'website' => 'nullable|url',
            'contact_person_email' => 'nullable|email',
            'contact_person_phone_number' => 'nullable',
            'birthdate' => 'nullable|date',
            'pan' => 'nullable',
            'tan' => 'nullable',
            'cin' => 'nullable',
            'gstin' => 'nullable',
        ]);
    
        // Check if Vendor with the same email or phone number already exists
        $existingVendor = Vendor::where('email', $request->email)
            ->orWhere('phone_number', $request->phone_number)
            ->first();
    
        if ($existingVendor) {
            // Return errors with Inertia.js
            return redirect()->back()->withErrors([
                'email' => $existingVendor->email === $request->email
                    ? 'The email has already been taken.'
                    : null,
                'phone_number' => $existingVendor->phone_number === $request->phone_number
                    ? 'The phone number has already been taken.'
                    : null,
            ]);
        }
    
        // Create a new Vendor instance
        $vendor = Vendor::create([
            'trade_name' => $request->trade_name,
            'address' => $request->address,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'website' => $request->website,
            'contact_person_email' => $request->contact_person_email,
            'contact_person_phone_number' => $request->contact_person_phone_number,
            'birthdate' => $request->birthdate,
            'pan' => $request->pan,
            'tan' => $request->tan,
            'cin' => $request->cin,
            'gstin' => $request->gstin,
            'vendor_type' => $request->vendor_type,
            'password' => Hash::make($request->phone_number),
        ]);
    
        // Create a new User instance
        $user = User::create([
            'name' => $request->trade_name,
            'email' => $request->email,
            'password' => Hash::make($request->phone_number),
            'role_id' => 3,
        ]);
    
        return redirect()->route('vendor.register.store')->with('success', 'Customer created successfully!');
    }


    public function vendorList(Request $request)
    {        
        // Vendor record
    $vendorList = Vendor::all();
    return response()->json(['data'=>$vendorList],200);
    }
    public function vendorListfetch(Request $request)
    {        
        // Vendor record
    $vendorList = ServiceRequest::all();
    return response()->json(['data'=>$vendorList],200);
    }

    public function vendorListIndex(Request $request)
  {        
        // Vendor record
        return Inertia::render('Vendor/VendorList');
   }
   public function fetchListIndex(Request $request)
   {        
         // Vendor record
         return Inertia::render('Client/fetchform');
    }

 

    public function vendorUpdateIndex(Request $request, $id)
    {        
        // Fetch the Vendor record based on the provided $id
        $vendor = Vendor::find($id);
        // Pass the Vendor record to your Inertia.js view
        return Inertia::render('Vendor/VendorUpdate', ['vendor' => $vendor]);
    }

    public function VendorUpdateStore(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
        ]);
    
        $id = $request->id;
        $name = $request->name;
        $email = $request->email;
        $phone_number = $request->phone_number; 
    
        $user = Vendor::find($id);
        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Vendor is not found']);
        }
    
        // Update the Vendor properties
        $user->trade_name = $name;
        $user->email = $email;
        $user->phone_number = $phone_number; // Assign phone_number to the correct property
        $user->save();
    
        // Pass the updated Vendor data to the Inertia.js view
        return Inertia::render('Vendor/VendorUpdate', ['vendor' => $user]);
    }
    

   public function destroy(Request $request)
   {
       $request->validate([
           'vendor_id' => 'required',
       ]);

       $user_id = $request->vendor_id;

       $user = Vendor::where('id',$user_id);
       $user->delete();

        return redirect()->route('vendor.list.index')->with('success', 'Vendor Deleted Successfully');
   }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.centrale.anrec.manager;

import java.util.Collection;
import java.util.HashMap;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import org.centrale.anrec.items.Water;
import static org.eclipse.persistence.expressions.ExpressionOperator.toLowerCase;

/**
 *
 * @author yann
 */
public class ItemManagerImpl implements ItemManager {
    
    private EntityManagerFactory emf;
    private static ItemManagerImpl theItemManager;
    
    private ItemManagerImpl(){
        if(emf == null){
            // Create the factory
            emf = Persistence.createEntityManagerFactory("water_HMIPU");
            // Clear cache
            emf.getCache().evictAll();
        }
    }
    
    public static ItemManager getInstance(){
        if(theItemManager == null){
            theItemManager = new ItemManagerImpl();
        }
        return theItemManager;
    }
    
    @Override
    public Collection<Water> page(){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findAll", Water.class);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByName(String name){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByName", Water.class);
        queryProductsByName.setParameter("name", name);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByWaterId(int waterId){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByWaterId", Water.class);
        queryProductsByName.setParameter("waterId", waterId);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public Collection<Water> findByDistinctCountry(){
        EntityManager em = emf.createEntityManager();
        Query queryProductsByName = em.createNamedQuery("Water.findByDistinctCountry", Water.class);
        Collection theList = queryProductsByName.getResultList();
        return theList;
    }
    
    @Override
    public boolean getParameterValues(HashMap<String, String> parameters, HashMap<String, Integer> valid_parameters, HashMap<String, String> response){
        boolean valid = true;
        EntityManager em = emf.createEntityManager();
        
        // Name management
        if(valid_parameters.get("name") == -1){
            // Non valid parameter
            response.put("Nom", "invalide");
            valid = false;
        }
        else if(valid_parameters.get("name") == 1){
            // Used and valid parameter
            response.put("Nom", parameters.get("name"));
        }
        
        // Country management
        if(valid_parameters.get("country") == -1){
            // Non valid parameter
            response.put("country", "invalide");
            valid = false;
        }
        else if(valid_parameters.get("country") == 1){
            // Used and valid parameter
            // Check if the id of the water exists
            Query queryProductsByName = em.createNamedQuery("Water.findByWaterId", Water.class);
            queryProductsByName.setParameter("waterId", Integer.parseInt(parameters.get("country")));
            Collection theList = queryProductsByName.getResultList();
            if(theList.isEmpty()){
                // Fake water id
                response.put("Pays", "invalide");
                valid = false;
            }
            else{
                Water w = (Water) theList.toArray()[0];
                response.put("Pays", w.getCountry());
            }
        }
            
        String[] l = {"Tous les minéraux", "Calcium", "Magnesium", "Sodium", "Potassium", "Sulfate", "Nitrate", "Bicarbonate", "Chlore"};
        
        // Case of twice the same component
        if((valid_parameters.get("component1") == 1) && (valid_parameters.get("component2") == 1) &&
                (parameters.get("component1_name").equals(parameters.get("component2_name")))){
            // Same component
            if(parameters.get("component1_order").equals(parameters.get("component2_order"))){
                String msg = "";

                double val1 = Double.parseDouble(parameters.get("component1_mass"));
                double val2 = Double.parseDouble(parameters.get("component2_mass"));

                if(parameters.get("component1_order").equals("0")){
                    msg += "Minimum : ";
                    if(val1>val2){
                        msg += parameters.get("component1_mass") + " g/L";
                    }
                    else{
                        msg += parameters.get("component2_mass") + " g/L";
                    }
                }
                else{
                    msg += "Maximum : ";
                    if(val1<val2){
                        msg += parameters.get("component1_mass") + " g/L";
                    }
                    else{
                        msg += parameters.get("component2_mass") + " g/L";
                    }
                }                    

                response.put(l[Integer.parseInt(parameters.get("component1_name"))], msg);
            }
            else{
                String msg = "";

                if(parameters.get("component1_order").equals("0")){
                    // Component1 is set to Minimum and component2 to Maximum
                    msg += "Minimum : ";
                    msg += parameters.get("component1_mass") + " g/L  |";
                    msg += "  Maximum : ";
                    msg += parameters.get("component2_mass") + " g/L |";
                }
                else{
                    // Component1 is set to Maximum and component2 to Minimum
                    msg += "Minimum : ";
                    msg += parameters.get("component2_mass") + " g/L  |";
                    msg += "  Maximum : ";
                    msg += parameters.get("component1_mass") + " g/L |";
                }                    

                response.put(l[Integer.parseInt(parameters.get("component1_name"))], msg);
            }
        }
        else{ 
            // Two different components
            // Distinct managment for each component
            
            // Component1 management
            if(valid_parameters.get("component1") == -1){
                // Non valid parameter
                response.put("Composant 1", "invalide");
                valid = false;
            }
            else if(valid_parameters.get("component1") == 1){
                // Used and valid parameter
                String msg = "";
                if(parameters.get("component1_order").equals("0")){
                    msg += "Minimum : ";
                }
                else{
                    msg += "Maximum : ";
                }
                msg += parameters.get("component1_mass") + " g/L";

                response.put(l[Integer.parseInt(parameters.get("component1_name"))], msg);

            }

            // Component2 management
            if(valid_parameters.get("component2") == -1){
                // Non valid parameter
                response.put("Composant 2", "invalide");
                valid = false;
            }
            else if(valid_parameters.get("component2") == 1){
                // Used and valid parameter
                String msg = "";
                if(parameters.get("component2_order").equals("0")){
                    msg += "Minimum : ";
                }
                else{
                    msg += "Maximum : ";
                }
                msg += parameters.get("component2_mass") + " g/L";

                response.put(l[Integer.parseInt(parameters.get("component2_name"))], msg);

            }
        }
        
        return valid;
    }
       
    @Override
    public Collection<Water> findByParameters(HashMap<String, String> parameters, HashMap<String, Integer> valid_parameters){
        EntityManager em = emf.createEntityManager();
        String base = "SELECT w FROM Water w WHERE";
        String end = " ORDER BY w.name";
        boolean used = false;
        String msg = "";
        
        String[] l = {"Tous les minéraux", "Calcium", "Magnesium", "Sodium", "Potassium", "Sulfate", "Nitrate", "Bicarbonate", "Chlore"};
        
        if(valid_parameters.get("name") == 1){
            msg += " UPPER(w.name) LIKE UPPER('" + parameters.get("name") + "%') ";
            used = true;
        }
        if(valid_parameters.get("country") == 1){
            if(used){
                msg += " AND";
            }
            Query queryProductsByName = em.createNamedQuery("Water.findByWaterId", Water.class);
            queryProductsByName.setParameter("waterId", Integer.parseInt(parameters.get("country")));
            Water w = (Water) queryProductsByName.getSingleResult();
            msg += " w.country = '" + w.getCountry() + "'";
            used = true;
        }
        if(valid_parameters.get("component1") == 1){
            if(used){
                msg += " AND";
            }
            if(parameters.get("component1_name").equals("0")){
                msg += " (w.magnesium + w.calcium + w.potassium + w.sodium)";
            }
            else{
                msg += " w." + l[Integer.parseInt(parameters.get("component1_name"))].toLowerCase();
            }
            if(parameters.get("component1_order").equals("0")){
                // Minimun filter
                msg += " > " + Double.parseDouble(parameters.get("component1_mass"));
            }
            else{
                // Maximum filter
                msg += " < " + Double.parseDouble(parameters.get("component1_mass"));
            }
            used = true;
        }
        if(valid_parameters.get("component2") == 1){
            if(used){
                msg += " AND";
            }
            if(parameters.get("component2_name").equals("0")){
                msg += " (w.magnesium + w.calcium + w.potassium + w.sodium)";
            }
            else{
                msg += " w." + l[Integer.parseInt(parameters.get("component2_name"))].toLowerCase();
            }
            if(parameters.get("component2_order").equals("0")){
                // Minimun filter
                msg += " > " + Double.parseDouble(parameters.get("component2_mass"));
            }
            else{
                // Maximum filter
                msg += " < " + Double.parseDouble(parameters.get("component2_mass"));
            }
        }
        
        Query queryProducts = em.createQuery(base + msg + end, Water.class);
        Collection theList = queryProducts.getResultList();
        return theList;
    }
}

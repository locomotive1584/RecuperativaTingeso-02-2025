package com.project.report_ms.services;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.project.report_ms.models.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class ReportService {

    RestTemplate restTemplate = new RestTemplate();

    String gatewayHost = System.getenv().getOrDefault("GATEWAY_HOST", "gateway");
    String gatewayPort = System.getenv().getOrDefault("GATEWAY_PORT", "8081");
    String baseUrl = "http://" + gatewayHost + ":" + gatewayPort;

    String ingressUrl = baseUrl + "/ingress/";
    String egressUrl = baseUrl + "/egress/";

    public boolean ping(){
        return true;
    }

    public TransactionDTO setAsEgress(Egress egress) {
        TransactionDTO transaction = new TransactionDTO();

        transaction.setEgress(true);

        transaction.setDate(egress.getDate());

        transaction.setDocType(egress.getDocType());

        transaction.setNumDoc(egress.getNumDoc());

        transaction.setReason(egress.getReason());

        transaction.setAmount(egress.getAmount());

        return transaction;
    }

    public List<TransactionDTO> setListEgress(List<Egress> listEgress) {
        List<TransactionDTO> listEgressDTO = new ArrayList<>();
        for (Egress egress : listEgress) {
            listEgressDTO.add(setAsEgress(egress));
        }
        return listEgressDTO;
    }

    public TransactionDTO setAsIngress(Ingress ingress) {
        TransactionDTO transaction = new TransactionDTO();

        transaction.setEgress(false);

        transaction.setDate(ingress.getDate());

        transaction.setDocType("Recibo");

        transaction.setNumDoc(ingress.getNumDoc());

        transaction.setReason("Ingreso a caja");

        transaction.setAmount(ingress.getAmount());

        return transaction;
    }

    public List<TransactionDTO> setListIngress(List<Ingress> listIngress) {
        List<TransactionDTO> listIngressDTO = new ArrayList<>();
        for (Ingress ingress : listIngress) {
            listIngressDTO.add(setAsIngress(ingress));
        }
        return listIngressDTO;
    }

    public List<TransactionDTO> filterAfter(List<TransactionDTO> inputList, LocalDate from){

        if(inputList.get(0).getDate().isAfter(from) || inputList.get(0).getDate().isEqual(from)){
            return inputList;
        }

        int cuttingFrom = -1;
        for (int i = 0; i < inputList.size(); i++) {
            if (inputList.get(i).getDate().isEqual(from) || inputList.get(i).getDate().isAfter(from)) {
                cuttingFrom = i;
                break;
            }
        }

        if(cuttingFrom == -1){
            return new ArrayList<TransactionDTO>();
        }

        return new ArrayList<>(inputList.subList(cuttingFrom, inputList.size()));
    }

    public List<TransactionDTO> filterBefore(List<TransactionDTO> inputList, LocalDate to){
        if(inputList.get(inputList.size()-1).getDate().isBefore(to) || inputList.get(inputList.size()-1).getDate().isEqual(to)){
            return inputList;
        }

        int cuttingTo = -1;
        for (int i = 1; i < inputList.size() + 1; i++) {
            
            if ((inputList.get(inputList.size()-i).getDate().isBefore(to)) || (inputList.get(inputList.size()-i).getDate().equals(to))) {
                cuttingTo = inputList.size()-i+1;
                break;
            }
        }

        if(cuttingTo == -1){
            return new ArrayList<TransactionDTO>();
        }

        return new ArrayList<>(inputList.subList(0, cuttingTo));
    }


    public List<TransactionDTO> filter(List<TransactionDTO> inputList, LocalDate from, LocalDate to){

        if(from == null && to == null){
            return inputList;
        }

        if(from != null){
            inputList = filterAfter(inputList, from);
        }

        if(to != null){
            inputList = filterBefore(inputList, to);
        }

        return inputList;
    }

    public List<TransactionDTO> getSortedList(){
        ResponseEntity<List<Ingress>> ingressResponse = restTemplate.exchange(
                ingressUrl + "all/sorted",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Ingress>>() {}
        );
        List<Ingress> ingresses = ingressResponse.getBody();

        System.out.println(ingresses);

        ResponseEntity<List<Egress>> egressResponse = restTemplate.exchange(
                egressUrl + "all/sorted",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Egress>>() {}
        );
        List<Egress> egresses = egressResponse.getBody();

        System.out.println(egresses);

        List<TransactionDTO> sortedList = new ArrayList<>();

        List<TransactionDTO> ingressesToTransaction = new ArrayList<>();
        List<TransactionDTO> egressesToTransaction = new ArrayList<>();


        if(ingresses != null){
            ingressesToTransaction = setListIngress(ingresses);
            System.out.println("ingressesToTransaction presorting: " + ingressesToTransaction.toString());
        }

        if(egresses != null){
            egressesToTransaction = setListEgress(egresses);
            System.out.println("egressesToTransaction presorting: " + egressesToTransaction.toString());
        }

        int frontOfIngress = 0;
        int frontOfEgress = 0;

        if(ingressesToTransaction != null && egressesToTransaction != null){

            while (frontOfIngress < ingressesToTransaction.size() || frontOfEgress < egressesToTransaction.size()) {

                LocalDate dateOfIngress = ingressesToTransaction.get(0).getDate();
                LocalDate dateOfEgress = egressesToTransaction.get(0).getDate();

                if (frontOfIngress < ingressesToTransaction.size()){
                    dateOfIngress = ingressesToTransaction.get(frontOfIngress).getDate();
                }

                if (frontOfEgress < egressesToTransaction.size()){
                    dateOfEgress = egressesToTransaction.get(frontOfEgress).getDate();
                }

                if (frontOfIngress < ingressesToTransaction.size() &&
                        (dateOfIngress.isBefore(dateOfEgress) || dateOfIngress.isEqual(dateOfEgress))) {

                    sortedList.add(ingressesToTransaction.get(frontOfIngress));
                    frontOfIngress++;
                }
                else {
                    sortedList.add(egressesToTransaction.get(frontOfEgress));
                    frontOfEgress++;
                }
            }
        }

        System.out.println("ingressesToTransaction postsorting: " + ingressesToTransaction.toString());
        System.out.println("egressesToTransaction postsorting: " + egressesToTransaction.toString());
        System.out.println("ingressesToTransactionIsNull: " + ingressesToTransaction == null);
        System.out.println("egressesToTransactionIsNull: " + egressesToTransaction == null);

        if(ingressesToTransaction != null && egressesToTransaction == null){
            sortedList = ingressesToTransaction;
        }

        if(egressesToTransaction != null && ingressesToTransaction == null){
            sortedList = egressesToTransaction;
        }

        System.out.println("sortedList in getSortedList(): " + sortedList.toString());

        return sortedList;
    }


    public List<TransactionDTO> sortBetweenDates(LocalDate from, LocalDate to){

        List<TransactionDTO> sortedList = getSortedList();

        sortedList = filter(sortedList, from, to);

        System.out.println("sortedList in sortBetweenDates(): " + sortedList.toString());

        return sortedList;
    }
}
